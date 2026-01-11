import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const noteMethodPrompts: Record<string, string> = {
  cornell: `Generate notes in Cornell Method format. Return a JSON object with:
    - cues: array of 4-6 key questions/keywords for the left column
    - notes: array of detailed notes corresponding to each cue
    - summary: a 2-3 sentence summary of the entire topic`,
  
  mindmap: `Generate notes in Mind Map format. Return a JSON object with:
    - center: the main topic
    - branches: array of 4-6 objects, each with title, items (array of 3-4 subtopics), and color (bg-blue-100, bg-green-100, bg-purple-100, or bg-orange-100)`,
  
  outline: `Generate notes in Outline format. Return a JSON object with:
    - sections: array of 2-3 sections, each with title and points (array of objects with main and sub array)`,
  
  boxing: `Generate notes in Boxing Method format. Return a JSON object with:
    - boxes: array of 4-6 objects, each with title, color (blue, green, purple, orange), and items (array of 3-4 bullet points)`,
  
  charting: `Generate notes in Charting Method format. Return a JSON object with:
    - headers: array of 4-6 column headers
    - rows: 2D array of data rows`,
  
  zettelkasten: `Generate notes in Zettelkasten format. Return a JSON object with:
    - notes: array of 3-4 atomic notes, each with id (like 1a, 1b, 2a), title, content, links (array of related note ids), and tags (array of 2-3 tags)`,
  
  feynman: `Generate notes in Feynman Technique format. Return a JSON object with:
    - concept: the main concept name
    - simpleExplanation: explain the concept as if teaching a child (2-3 sentences)
    - gaps: array of 2-3 areas that need more clarity
    - refinedExplanation: a more complete explanation addressing the gaps`,
  
  flowchart: `Generate notes in Flowchart format. Return a JSON object with:
    - title: the process name
    - nodes: array of 5-7 nodes, each with id, type (start, process, decision, or end), text, and connections (array of connected node ids)`,
  
  sentence: `Generate notes in Sentence Method format. Return a JSON object with:
    - sentences: array of 6-10 complete factual sentences about the topic`,
  
  sketchnote: `Generate notes in Sketchnote format. Return a JSON object with:
    - title: the main topic
    - sections: array of 4 objects, each with heading, notes (array of 3 bullet points), and icon (single emoji)`
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

    // Get user from auth token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { courseId, courseName, method, topic } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const methodPrompt = noteMethodPrompts[method] || noteMethodPrompts.outline;

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
            content: `You are an expert educator creating study notes. ${methodPrompt}

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, just the raw JSON object.`
          },
          {
            role: 'user',
            content: `Create comprehensive study notes for: "${courseName}" - Topic: "${topic || 'General Overview'}"`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI usage limit reached. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the JSON content
    let parsedContent;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedContent = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse generated notes');
    }

    // Save the note to database
    const { data: note, error: saveError } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        course_id: courseId || null,
        title: `${courseName} - ${topic || 'Notes'}`,
        method: method,
        content: parsedContent,
        is_ai_generated: true,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Failed to save note:', saveError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      content: parsedContent,
      noteId: note?.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in generate-notes:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});