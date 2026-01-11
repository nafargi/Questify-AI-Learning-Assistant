import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user's recent activity data
    const [examsRes, sessionsRes, profileRes] = await Promise.all([
      supabase.from('exams').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      supabase.from('study_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
      supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    ]);

    const exams = examsRes.data || [];
    const sessions = sessionsRes.data || [];
    const profile = profileRes.data;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are an AI learning coach analyzing student performance data. Generate personalized insights and recommendations.

Return a JSON object with:
- insights: array of 3-5 insights, each with:
  - type: performance, behavior, recommendation, or alert
  - title: short title
  - description: detailed description
  - priority: low, medium, or high
  - actionable: boolean
  - action: optional action text

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks.`
          },
          {
            role: 'user',
            content: `Analyze this student's data:
- Current streak: ${profile?.current_streak || 0} days
- Average score: ${profile?.average_score || 0}%
- Exams completed: ${profile?.exams_completed || 0}
- Total study time: ${profile?.total_study_time || 0} minutes
- Recent exam scores: ${exams.map(e => e.score).filter(Boolean).join(', ') || 'No exams yet'}
- Study session types: ${sessions.map(s => s.session_type).join(', ') || 'No sessions yet'}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let analysis;
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanContent);
    } catch (parseError) {
      // Return default insights if parsing fails
      analysis = {
        insights: [
          {
            type: 'recommendation',
            title: 'Start Your Learning Journey',
            description: 'Upload some study materials to get personalized insights and recommendations.',
            priority: 'high',
            actionable: true,
            action: 'Upload Materials'
          }
        ]
      };
    }

    // Save insights to database
    if (analysis.insights?.length > 0) {
      const insightsToInsert = analysis.insights.map((insight: any) => ({
        user_id: user.id,
        insight_type: insight.type,
        title: insight.title,
        description: insight.description,
        priority: insight.priority,
        actionable: insight.actionable,
        action: insight.action,
      }));

      await supabase.from('ai_insights').insert(insightsToInsert);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      ...analysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in ai-insights:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});