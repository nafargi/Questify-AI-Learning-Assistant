import { useState, useEffect } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Timer, BookOpen, Play, Pause, ArrowCounterClockwise, ArrowsOut, Info } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@/components/study/PDFViewer";

// --- Types ---
type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'BREAK';

interface PomodoroMethodProps {
    chapterId: string;
    courseId: string;
    bookFilename?: string; // New prop
    onBack: () => void;
}

export function PomodoroMethod({ chapterId, courseId, bookFilename, onBack }: PomodoroMethodProps) {
    // Timer State
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [timerState, setTimerState] = useState<TimerState>('IDLE');
    const [cycleCount, setCycleCount] = useState(0);
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    // Content State
    const [highlights, setHighlights] = useState<string[]>([]);

    // --- Timer Logic ---
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerState === 'RUNNING' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(interval);
    }, [timerState, timeLeft]);

    const handleTimerComplete = () => {
        if (timerState === 'RUNNING') {
            setCycleCount(c => c + 1);
            setTimerState('BREAK');
            setTimeLeft(5 * 60); // 5 min break
            new Audio('/sounds/bell.mp3').play().catch(() => { }); // Mock sound
        } else {
            setTimerState('IDLE');
            setTimeLeft(25 * 60);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <StudySessionLayout
            title="Pomodoro Focus"
            subtitle={bookFilename}
            icon={Timer}
            color="text-orange-500"
            onExit={onBack}
            rightAction={
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowInfo(!showInfo)}
                        className="text-xs gap-1"
                    >
                        <Info className="w-4 h-4" />
                        How it works
                    </Button>
                    <Badge variant={timerState === 'RUNNING' ? "destructive" : "secondary"}>
                        {timerState === 'RUNNING' ? 'FOCUS MODE' : timerState === 'BREAK' ? 'BREAK TIME' : 'READY'}
                    </Badge>
                </div>
            }
        >
            <div className="flex h-full relative">
                {/* --- LEFT PANEL: PDF Viewer --- */}
                <div className={cn(
                    "flex-1 overflow-hidden flex flex-col relative border-r transition-all duration-500",
                    isFullWidth ? "w-full" : ""
                )}>
                    {bookFilename ? (
                        <div className={cn("h-full w-full", timerState === 'BREAK' && "blur-sm opacity-50")}>
                            <PDFViewer
                                filename={bookFilename}
                                onHighlight={(text) => setHighlights([...highlights, text])}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No Book Selected
                        </div>
                    )}

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsFullWidth(!isFullWidth)}
                        className="absolute bottom-4 right-4 z-50 shadow-lg gap-2"
                    >
                        <ArrowsOut className="w-4 h-4" />
                        {isFullWidth ? "Show Controls" : "Full Width PDF"}
                    </Button>

                    {timerState === 'BREAK' && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <h2 className="text-4xl font-bold text-green-600 bg-white/80 px-8 py-4 border shadow-xl backdrop-blur">
                                TAKE A BREAK
                            </h2>
                        </div>
                    )}
                </div>

                {/* --- RIGHT PANEL: Timer & Session Controls --- */}
                <div className={cn(
                    "bg-card/50 flex flex-col border-l transition-all duration-500 overflow-hidden",
                    isFullWidth ? "w-0 p-0 border-none" : "w-80 p-6 gap-8"
                )}>
                    {/* Timer UI */}
                    <div className="flex flex-col items-center justify-center py-6 relative shrink-0">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="96" cy="96" r="88" className="stroke-muted" strokeWidth="12" fill="none" />
                                <circle
                                    cx="96" cy="96" r="88"
                                    className={cn("transition-all duration-1000", timerState === 'BREAK' ? "stroke-green-500" : "stroke-orange-500")}
                                    strokeWidth="12" fill="none"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - timeLeft / (timerState === 'BREAK' ? 300 : 1500))}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-mono font-bold tracking-tighter">{formatTime(timeLeft)}</span>
                                <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">{timerState === 'IDLE' ? 'Ready' : timerState}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8 w-full">
                            <Button size="lg" className="flex-1" onClick={() => setTimerState(prev => prev === 'RUNNING' ? 'PAUSED' : 'RUNNING')}>
                                {timerState === 'RUNNING' ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                                {timerState === 'RUNNING' ? "Pause" : "Start"}
                            </Button>
                            <Button size="icon" variant="outline" onClick={() => { setTimerState('IDLE'); setTimeLeft(1500); }}>
                                <ArrowCounterClockwise className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Session Stats */}
                    <div className="space-y-4 shrink-0">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Sessions Completed</span>
                            <span className="font-bold">{cycleCount}</span>
                        </div>
                        <Progress value={(cycleCount % 4) * 25} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">
                            Long break in {4 - (cycleCount % 4)} sessions
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 border-t pt-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            Highlights Log
                        </h4>
                        <ScrollArea className="flex-1 -mr-4 pr-4">
                            {highlights.length === 0 ? (
                                <div className="text-sm text-muted-foreground text-center py-8 opacity-50">
                                    Select text to highlight important concepts.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {highlights.map((h, i) => (
                                        <div key={i} className="p-3 mb-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs">
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>

                {/* --- OVERLAY: How it works --- */}
                {showInfo && (
                    <div className="absolute inset-0 z-[100] bg-background/95 backdrop-blur-md p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                        <div className="max-w-xl space-y-8">
                            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                                <Timer className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black tracking-tight">The Pomodoro Technique</h2>
                                <p className="text-muted-foreground">A simple but powerful method for deep concentration.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div className="p-4 rounded-xl border bg-card">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-orange-500">
                                        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[10px]">1</div>
                                        The Work Sprint
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Focus for 25 minutes on a single task. Avoid all distractions. No multitasking.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border bg-card">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-green-500">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px]">2</div>
                                        The Short Break
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Rest for 5 minutes. Walk away, stretch, or grab water. No screens.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border bg-card">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-purple-500">
                                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px]">3</div>
                                        Repeat 4 Times
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Complete four work sessions to build momentum and master your topic.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border bg-card">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-blue-500">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">4</div>
                                        The Long Break
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        After 4 sprints, take a longer 20-30 minute break to fully recharge.
                                    </p>
                                </div>
                            </div>

                            <Button onClick={() => setShowInfo(false)} className="w-full h-12 text-base font-bold shadow-lg shadow-orange-500/20">
                                Got it, let's focus
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </StudySessionLayout>
    );
}
