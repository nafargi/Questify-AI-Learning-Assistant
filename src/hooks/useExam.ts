import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GenerateExamParams {
  courseId?: string;
  courseName: string;
  units?: string[];
  questionTypes: string[];
  difficulty: number;
  questionCount: number;
}

interface ExamQuestion {
  id: string;
  question: string;
  type: string;
  options?: string[];
  userAnswer?: string;
  correctAnswer: string;
  explanation?: string;
  isCorrect?: boolean;
  timeSpent: number;
  flagged: boolean;
}

export function useExam() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateExam = async (params: GenerateExamParams) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-exam', {
        body: params,
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return { examId: data.examId, questions: data.questions as ExamQuestion[] };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to generate exam';
      toast.error(message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const submitExam = async (examId: string, answers: Record<string, string>, timeTaken: number) => {
    // Calculate score
    const { data: questions, error: fetchError } = await supabase
      .from('exam_questions')
      .select('*')
      .eq('exam_id', examId);

    if (fetchError) throw fetchError;

    let correctAnswers = 0;
    for (const q of questions || []) {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct_answer;
      
      await supabase
        .from('exam_questions')
        .update({ user_answer: userAnswer, is_correct: isCorrect })
        .eq('id', q.id);

      if (isCorrect) correctAnswers++;
    }

    const score = Math.round((correctAnswers / (questions?.length || 1)) * 100);

    // Update exam record
    const { error: updateError } = await supabase
      .from('exams')
      .update({
        completed_at: new Date().toISOString(),
        score,
        correct_answers: correctAnswers,
        time_taken: timeTaken,
      })
      .eq('id', examId);

    if (updateError) throw updateError;

    return { score, correctAnswers, totalQuestions: questions?.length || 0 };
  };

  const fetchExamHistory = async () => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching exam history:', error);
      return [];
    }

    return data;
  };

  return {
    isGenerating,
    generateExam,
    submitExam,
    fetchExamHistory,
  };
}