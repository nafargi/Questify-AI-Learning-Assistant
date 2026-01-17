import { useState, useEffect, useMemo, useCallback } from 'react';
import { Question, sampleQuestions } from '../data/mockData';

interface ExamConfig {
  courseId: string;
  unitIds: string[];
  questionTypes: string[];
  difficulty: string;
  count: number;
  timeLimit: number; // in minutes
}

export const useExam = (config: ExamConfig) => {
  // Select and shuffle questions based on config
  const selectedQuestions = useMemo(() => {
    let filtered = sampleQuestions.filter(q => {
      const courseMatch = q.courseId === config.courseId;
      const unitMatch = config.unitIds.length === 0 || config.unitIds.includes('all') || config.unitIds.includes(q.unitId);
      const typeMatch = config.questionTypes.length === 0 || config.questionTypes.includes('all') || config.questionTypes.includes(q.type);
      const diffMatch = config.difficulty === 'mixed' || q.difficulty === config.difficulty;

      return courseMatch && unitMatch && typeMatch && diffMatch;
    });

    // Shuffle and slice
    return filtered.sort(() => Math.random() - 0.5).slice(0, config.count);
  }, [
    config.courseId,
    config.difficulty,
    config.count,
    config.unitIds,
    config.questionTypes
  ]);

  // State
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(Date.now());

  // Timer logic
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  // Handlers
  const setAnswer = useCallback((questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const finishExam = useCallback(() => {
    setIsFinished(true);
  }, []);

  // Scoring logic
  const results = useMemo(() => {
    if (!isFinished) return null;

    let correctCount = 0;
    const details = selectedQuestions.map(q => {
      const userAnswer = answers[q.id];
      let isCorrect = false;

      if (q.type === 'mcq' || q.type === 'true-false') {
        isCorrect = userAnswer === q.correctAnswer;
      } else if (q.type === 'fill-blank') {
        // Simple array comparison
        const expected = q.correctAnswer as string[];
        isCorrect = Array.isArray(userAnswer) &&
          userAnswer.length === expected.length &&
          userAnswer.every((val, i) => val.trim().toLowerCase() === expected[i].trim().toLowerCase());
      } else if (q.type === 'matching') {
        // For matching, userAnswer would be array of IDs in order
        const expected = q.correctAnswer as string[];
        isCorrect = Array.isArray(userAnswer) &&
          userAnswer.length === expected.length &&
          userAnswer.every((val, i) => val === expected[i]);
      } else if (q.type === 'coding') {
        // Mock coding check: just check for non-empty for now or string match
        isCorrect = userAnswer?.trim() === (q.solution as string)?.trim();
      }

      if (isCorrect) correctCount++;
      return { id: q.id, isCorrect, userAnswer };
    });

    return {
      score: Math.round((correctCount / selectedQuestions.length) * 100),
      correctCount,
      totalCount: selectedQuestions.length,
      details,
      timeTaken: Math.round((Date.now() - startTime) / 1000)
    };
  }, [isFinished, selectedQuestions, answers, startTime]);

  return {
    questions: selectedQuestions,
    answers,
    setAnswer,
    timeLeft,
    isFinished,
    finishExam,
    results
  };
};