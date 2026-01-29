import React, { useRef, useEffect } from 'react';
import {
    Clock,
    CheckCircle,
    Warning,
    Flag,
    CaretRight,
    CaretLeft,
    List,
    SquaresFour,
    PaperPlaneTilt,
    Brain
} from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { cn } from '../lib/utils';
import { QuestionRenderer } from '../components/exam/QuestionRenderer';
import { WeakPointAnalysisView } from '../components/exam/WeakPointAnalysisView';
import { useTheme } from 'next-themes';

interface ExamRoomProps {
    questions: any[];
    answers: Record<string, any>;
    onAnswer: (id: string, value: any) => void;
    timeLeft: number;
    isFinished: boolean;
    onFinish: () => void;
    results: any;
    onReset: () => void;
}



// Memoized Content Component
const ExamContent = React.memo(({
    questions,
    answers,
    onAnswer,
    onFinish
}: {
    questions: any[],
    answers: Record<string, any>,
    onAnswer: (id: string, value: any) => void,
    onFinish: () => void
}) => {
    const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollToQuestion = (id: string) => {
        questionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Navigation Sidebar */}
            <aside className="lg:col-span-3">
                <Card className="rounded-lg border-none shadow-sm sticky top-24">
                    <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <List className="w-4 h-4" />
                            Question Navigator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => scrollToQuestion(q.id)}
                                    className={cn(
                                        "aspect-square rounded-lg text-xs font-bold transition-all flex items-center justify-center border",
                                        answers[q.id]
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-muted text-muted-foreground border-transparent hover:border-muted-foreground/20"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                Answered
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                <div className="w-2 h-2 rounded-full bg-muted" />
                                Remaining
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9 space-y-8">
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        ref={el => questionRefs.current[question.id] = el}
                        className="scroll-mt-24"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-bold text-muted-foreground">Question {index + 1}</span>
                            <Badge variant="outline" className="rounded-full text-[10px]">{question.type}</Badge>
                            <Badge variant="secondary" className="rounded-full text-[10px]">{question.difficulty}</Badge>
                        </div>

                        <Card className="rounded-lg border-none shadow-sm transition-shadow hover:shadow-md">
                            <CardContent className="p-6 md:p-8">
                                <QuestionRenderer
                                    question={question}
                                    value={answers[question.id]}
                                    onChange={(val) => onAnswer(question.id, val)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                ))}

                <div className="pt-12 pb-24 text-center border-t">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <PaperPlaneTilt className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ready to finish?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Review your answers before submitting the exam.</p>
                    <Button
                        onClick={onFinish}
                        size="lg"
                        className="rounded-full px-12"
                    >
                        Submit Assessment
                    </Button>
                </div>
            </main>
        </div>
    );
});
ExamContent.displayName = 'ExamContent';

export default function ExamRoom({
    questions,
    answers,
    onAnswer,
    timeLeft,
    isFinished,
    onFinish,
    results,
    onReset
}: ExamRoomProps) {

    if (isFinished && results) {
        return <WeakPointAnalysisView results={results} questions={questions} answers={answers} />;
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const answeredCount = Object.keys(answers).length;
    const progressPercent = (answeredCount / questions.length) * 100;

    return (
        <div className="bg-muted/10 min-h-screen">
            {/* Secondary Exam Bar */}
            <div className="bg-background/80 backdrop-blur-md border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:block">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Progress</span>
                                <span className="text-xs font-bold">{Math.round(progressPercent)}%</span>
                            </div>
                            <Progress value={progressPercent} className="w-32 h-1.5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold tabular-nums",
                            timeLeft < 60 ? "border-destructive text-destructive animate-pulse" : "bg-muted/50 border-transparent"
                        )}>
                            <Clock className="w-4 h-4" />
                            {formatTime(timeLeft)}
                        </div>
                        <Button
                            onClick={onFinish}
                            size="sm"
                            className="rounded-full shadow-lg shadow-primary/20 h-9 px-6"
                        >
                            Finish Assessment
                        </Button>
                    </div>
                </div>
            </div>

            <ExamContent
                questions={questions}
                answers={answers}
                onAnswer={onAnswer}
                onFinish={onFinish}
            />
        </div>
    );
};

