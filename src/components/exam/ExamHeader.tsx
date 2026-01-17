import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Flag, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '@/data/mockData';

interface ExamHeaderProps {
    questions: Question[];
    currentQuestionIndex: number;
    timeRemaining: number;
    flaggedQuestions: Set<string>;
    answers: Record<string, any>;
    onJumpToQuestion: (index: number) => void;
    onFinish: () => void;
}

export function ExamHeader({
    questions,
    currentQuestionIndex,
    timeRemaining,
    flaggedQuestions,
    answers,
    onJumpToQuestion,
    onFinish,
}: ExamHeaderProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (Object.keys(answers).length / questions.length) * 100;

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Time Remaining</p>
                                <p className={cn(
                                    "text-xl font-bold font-mono tracking-tight",
                                    timeRemaining < 60 ? "text-destructive animate-pulse" : "text-foreground"
                                )}>
                                    {formatTime(timeRemaining)}
                                </p>
                            </div>
                        </div>

                        <div className="h-10 w-[1px] bg-border hidden sm:block" />

                        <div className="hidden sm:block">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Overall Progress</p>
                            <div className="flex items-center gap-3">
                                <Progress value={progress} className="w-32 h-2" />
                                <span className="text-sm font-bold">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="hidden lg:flex gap-2"
                            onClick={() => {/* Save Draft logic if needed */ }}
                        >
                            Save Draft
                        </Button>
                        <Button
                            className="gradient-primary shadow-lg shadow-primary/20 gap-2"
                            onClick={onFinish}
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Finish Exam
                        </Button>
                    </div>
                </div>

                {/* Navigator Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                    {questions.map((q, idx) => {
                        const isCurrent = currentQuestionIndex === idx;
                        const isAnswered = answers[q.id] !== undefined;
                        const isFlagded = flaggedQuestions.has(q.id);

                        return (
                            <button
                                key={q.id}
                                onClick={() => onJumpToQuestion(idx)}
                                className={cn(
                                    "flex-shrink-0 w-10 h-10 rounded-lg text-sm font-bold transition-all relative group",
                                    isCurrent
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                        : isAnswered
                                            ? "bg-success/10 text-success border border-success/20 hover:bg-success/20"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"
                                )}
                            >
                                {idx + 1}
                                {isFlagded && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full border border-background flex items-center justify-center">
                                        <Flag className="w-2.5 h-2.5 text-warning-foreground fill-current" />
                                    </div>
                                )}
                                {/* Tooltip hint on hover could be added here */}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
