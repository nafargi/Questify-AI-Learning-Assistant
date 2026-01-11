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

    const { courseId, courseName, units, questionTypes, difficulty, questionCount } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const difficultyLabel = difficulty < 40 ? 'easy' : difficulty < 70 ? 'medium' : 'hard';
    const typesString = questionTypes.join(', ');
    const unitsString = units?.length > 0 ? units.join(', ') : 'all topics';

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
            content: `You are an expert educator creating exam questions. Generate exactly ${questionCount} questions for a ${difficultyLabel} difficulty exam.

Question types to include: ${typesString}

For each question, return a JSON object with:
- question: the question text
- type: one of [mcq, true-false, fill-blank, short-answer]
- difficulty: easy, medium, or hard
- options: array of 4 options (for mcq only, null for others)
- correctAnswer: the correct answer
- explanation: brief explanation of why this is correct

Return ONLY a JSON array of question objects, no markdown, no code blocks.`
          },
          {
            role: 'user',
            content: `Create ${questionCount} ${difficultyLabel} exam questions for "${courseName}" covering: ${unitsString}`
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

    let questions;
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questions = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse generated questions');
    }

    // Create exam record
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .insert({
        user_id: user.id,
        course_id: courseId || null,
        title: `${courseName} - ${difficultyLabel.charAt(0).toUpperCase() + difficultyLabel.slice(1)} Exam`,
        question_types: questionTypes,
        difficulty: difficulty,
        question_count: questionCount,
        time_limit: questionCount * 60,
        started_at: new Date().toISOString(),
        total_questions: questions.length,
      })
      .select()
      .single();

    if (examError) {
      console.error('Failed to create exam:', examError);
      throw new Error('Failed to create exam');
    }

    // Insert questions
    const questionsToInsert = questions.map((q: any, index: number) => ({
      exam_id: exam.id,
      user_id: user.id,
      question: q.question,
      question_type: q.type || 'mcq',
      difficulty: q.difficulty || difficultyLabel,
      options: q.options || [],
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      order_index: index,
    }));

    const { error: questionsError } = await supabase
      .from('exam_questions')
      .insert(questionsToInsert);

    if (questionsError) {
      console.error('Failed to insert questions:', questionsError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      examId: exam.id,
      questions: questions.map((q: any, index: number) => ({
        id: `q-${index}`,
        ...q,
        timeSpent: 0,
        flagged: false,
      }))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in generate-exam:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});