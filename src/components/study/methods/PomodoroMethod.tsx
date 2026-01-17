import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Plus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface PomodoroMethodProps {
    chapterId: string;
    courseId: string;
    onBack: () => void;
}

export function PomodoroMethod({ chapterId, courseId, onBack }: PomodoroMethodProps) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
    const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([
        { id: '1', text: `Read ${chapterId || 'Chapter'} introduction`, completed: false },
        { id: '2', text: 'Summarize key concepts', completed: false }
    ]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play sound or notify
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'work') setTimeLeft(25 * 60);
        else if (mode === 'shortBreak') setTimeLeft(5 * 60);
        else setTimeLeft(15 * 60);
    };

    const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === 'work') setTimeLeft(25 * 60);
        else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
        else setTimeLeft(15 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
        setNewTask("");
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const calculateProgress = () => {
        if (mode === 'work') return ((25 * 60 - timeLeft) / (25 * 60)) * 100;
        if (mode === 'shortBreak') return ((5 * 60 - timeLeft) / (5 * 60)) * 100;
        return ((15 * 60 - timeLeft) / (15 * 60)) * 100;
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience similar to Selector but calmer */}
            <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:30px_30px]" />

            {/* Back Button */}
            <div className="absolute top-4 left-4 z-20">
                <Button variant="ghost" className="gap-2" onClick={onBack}>
                    <ChevronLeft className="w-4 h-4" /> Exit Focus
                </Button>
            </div>

            <div className="max-w-md w-full z-10 space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Timer Card */}
                <div className="relative">
                    {/* Animated Glow Ring */}
                    <div className={cn(
                        "absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-1000",
                        isActive ? "bg-orange-500 scale-110" : "bg-primary/20 scale-90"
                    )} />

                    <div className="flex flex-col items-center justify-center space-y-8">
                        <div className="relative w-72 h-72 flex items-center justify-center">
                            {/* Progress Ring Implementation (simplified with CSS for now) */}
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="144" cy="144" r="130"
                                    className="stroke-muted fill-none stroke-[8px]"
                                />
                                <circle
                                    cx="144" cy="144" r="130"
                                    className={cn(
                                        "fill-none stroke-[8px] transition-all duration-1000 ease-linear",
                                        mode === 'work' ? "stroke-orange-500" : "stroke-green-500"
                                    )}
                                    strokeDasharray={2 * Math.PI * 130}
                                    strokeDashoffset={2 * Math.PI * 130 * (1 - calculateProgress() / 100)}
                                />
                            </svg>
                            <div className="absolute text-7xl font-mono font-bold tracking-tighter tabular-nums">
                                {formatTime(timeLeft)}
                            </div>
                            <div className="absolute bottom-20 text-sm font-medium tracking-widest uppercase opacity-70">
                                {mode === 'work' ? 'Focus Time' : 'Break Time'}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full w-12 h-12"
                                onClick={resetTimer}
                            >
                                <RotateCcw className="w-5 h-5" />
                            </Button>
                            <Button
                                size="icon"
                                className={cn(
                                    "rounded-full w-20 h-20 shadow-lg transition-all active:scale-95",
                                    isActive ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                                )}
                                onClick={toggleTimer}
                            >
                                {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                            </Button>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex gap-2 p-1 bg-muted/50 rounded-full">
                            {(['work', 'shortBreak', 'longBreak'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => handleModeChange(m)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                                        mode === m ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {m === 'work' ? 'Pomodoro' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Task List */}
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                        <ListTodo className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Session Objectives</h3>
                    </div>

                    <div className="space-y-3 mb-4">
                        {tasks.map(task => (
                            <div
                                key={task.id}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group",
                                    task.completed ? "bg-muted/50 border-transparent opacity-60" : "bg-background border-border hover:border-primary/30"
                                )}
                                onClick={() => toggleTask(task.id)}
                            >
                                {task.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                )}
                                <span className={cn("text-sm transition-all", task.completed && "line-through")}>{task.text}</span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={addTask} className="relative">
                        <Input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add purpose to your focus..."
                            className="pr-10 bg-background/50 border-dashed"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </form>
                </Card>

            </div>
        </div>
    );
}
