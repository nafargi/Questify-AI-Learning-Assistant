import React, { useRef, useEffect } from 'react';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    Flag,
    ChevronRight,
    Menu,
    LayoutDashboard,
    SendHorizontal,
    Sun,
    Moon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { cn } from '../lib/utils';
import { QuestionRenderer } from '../components/exam/QuestionRenderer';
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

// Memoized Header Component
const ExamHeader = React.memo(({
    timeLeft,
    onFinish,
    answeredCount,
    totalQuestions
}: {
    timeLeft: number,
    onFinish: () => void,
    answeredCount: number,
    totalQuestions: number
}) => {
    const { theme, setTheme } = useTheme();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercent = (answeredCount / totalQuestions) * 100;

    return (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b py-3 supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold leading-none">Assessment Session</h2>
                            <p className="text-[10px] text-muted-foreground font-medium mt-1">Live Examination</p>
                        </div>
                    </div>

                    <div className="h-8 w-px bg-border hidden sm:block" />

                    <div className="hidden sm:block">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Progress</span>
                            <span className="text-[10px] font-bold">{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="w-32 h-2" />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="rounded-full"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full border bg-card transition-colors",
                        timeLeft < 60 ? "border-destructive text-destructive animate-pulse" : "border-border"
                    )}>
                        <Clock className="w-4 h-4" />
                        <span className="text-lg font-mono font-bold tabular-nums">{formatTime(timeLeft)}</span>
                    </div>
                    <Button
                        onClick={onFinish}
                        className="shadow-sm"
                    >
                        <SendHorizontal className="w-4 h-4 mr-2" />
                        Submit Exam
                    </Button>
                </div>
            </div>
        </header>
    );
});
ExamHeader.displayName = 'ExamHeader';

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
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Navigation Sidebar */}
            <aside className="lg:col-span-3 h-fit sticky top-24">
                <Card className="border shadow-sm">
                    <CardHeader className="bg-muted/30 border-b py-3">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground">
                            <Menu className="w-3 h-3" />
                            Question Navigator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => scrollToQuestion(q.id)}
                                    className={cn(
                                        "aspect-square rounded-md text-xs font-medium transition-all flex items-center justify-center border",
                                        answers[q.id]
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background hover:bg-muted text-muted-foreground border-border"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                Answered
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase">
                                <div className="w-2 h-2 rounded-full border border-border bg-background" />
                                Unanswered
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
                        className="scroll-mt-28"
                    >
                        <div className="flex items-center gap-3 mb-3 px-1">
                            <span className="text-sm font-bold text-muted-foreground">Question {index + 1}</span>
                            <Badge variant="outline" className="text-[10px] font-bold bg-background">
                                {question.type}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] font-bold capitalize">
                                {question.difficulty}
                            </Badge>
                        </div>

                        <Card className={cn(
                            "border shadow-sm transition-all duration-300",
                            "hover:shadow-md hover:border-primary/20",
                            "group" // For child selectors if needed
                        )}>
                            <CardContent className="p-6 lg:p-8">
                                <QuestionRenderer
                                    question={question}
                                    value={answers[question.id]}
                                    onChange={(val) => onAnswer(question.id, val)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                ))}

                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border-t mt-12">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground/20" />
                    <div>
                        <h3 className="text-lg font-bold">Assessment Complete?</h3>
                        <p className="text-sm text-muted-foreground">
                            Review your answers or submit your examination.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="min-w-[200px]"
                        onClick={onFinish}
                    >
                        Finalize Submission
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
        return (
            <div className="min-h-screen bg-background p-6 lg:p-10 flex items-center justify-center">
                <Card className="max-w-3xl w-full shadow-lg">
                    <div className="bg-muted/30 p-8 text-center border-b">
                        <Badge className="mb-4" variant="secondary">Exam Completed</Badge>
                        <h1 className="text-5xl font-bold text-foreground mb-2">
                            {results.score}%
                        </h1>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Final Score</p>
                    </div>

                    <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center p-4 rounded-xl bg-muted/30">
                                <p className="text-2xl font-bold">{results.correctCount}/{results.totalCount}</p>
                                <p className="text-xs text-muted-foreground font-bold uppercase">Correct</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-muted/30">
                                <p className="text-2xl font-bold">{Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s</p>
                                <p className="text-xs text-muted-foreground font-bold uppercase">Time Taken</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-muted/30">
                                <p className="text-2xl font-bold">{Math.round(results.score / 10)}/10</p>
                                <p className="text-xs text-muted-foreground font-bold uppercase">GPA Impact</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold flex items-center gap-2">
                                <LayoutDashboard className="w-5 h-5 text-primary" />
                                Review
                            </h4>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {questions.map((q, i) => {
                                    const detail = results.details.find((d: any) => d.id === q.id);
                                    return (
                                        <div key={q.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm font-medium line-clamp-1 max-w-[400px]">{q.question}</span>
                                            </div>
                                            <Badge variant={detail?.isCorrect ? "default" : "destructive"}>
                                                {detail?.isCorrect ? "Correct" : "Incorrect"}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <Button variant="outline" className="flex-1" onClick={onReset}>
                                Return to Menu
                            </Button>
                            <Button className="flex-1" onClick={() => window.location.href = '/'}>
                                Go to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const answeredCount = Object.keys(answers).length;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <ExamHeader
                timeLeft={timeLeft}
                onFinish={onFinish}
                answeredCount={answeredCount}
                totalQuestions={questions.length}
            />

            <ExamContent
                questions={questions}
                answers={answers}
                onAnswer={onAnswer}
                onFinish={onFinish}
            />
        </div>
    );
};
