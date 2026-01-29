import { useState, useEffect } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Sparkle, Timer, Eye, EyeSlash, Check, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MOCK_CHAPTERS } from "@/data/mockChapters";

type BlurtingPhase = 'READ' | 'BLURT' | 'REVIEW';

export function BlurtingMethod({ onBack, chapterId }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [phase, setPhase] = useState<BlurtingPhase>('READ');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes initial read
    const [userNotes, setUserNotes] = useState("");
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    // Get content
    const content = MOCK_CHAPTERS[chapterId || '']?.sections?.[0]?.content ||
        "Blurting is a technique where you read a section of text for a set time, then close the book and write down everything you remember. This forces active recall and identifies gaps in your knowledge.";

    const title = MOCK_CHAPTERS[chapterId || '']?.sections?.[0]?.title || "Blurting Practice";

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning && timeLeft > 0 && phase !== 'REVIEW') {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && phase === 'READ') {
            handleStartBlurting();
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timeLeft, phase]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleStartBlurting = () => {
        setPhase('BLURT');
        setTimeLeft(600); // 10 mins to write
    };

    const handleFinishBlurting = () => {
        setPhase('REVIEW');
        setIsTimerRunning(false);
    };

    return (
        <StudySessionLayout
            title="Blurting Method"
            subtitle={phase === 'READ' ? "Memorization Phase" : phase === 'BLURT' ? "Active Recall Phase" : "Review Phase"}
            icon={Sparkle}
            color="text-pink-500"
            onExit={onBack}
            rightAction={
                phase !== 'REVIEW' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full font-mono text-sm font-bold">
                        <Timer className="w-4 h-4" />
                        {formatTime(timeLeft)}
                    </div>
                )
            }
        >
            <div className="flex flex-col h-full bg-background relative overflow-hidden">

                {/* --- Main Content Area --- */}
                <div className="flex-1 flex overflow-hidden">

                    {/* LEFT PANEL: Source Material */}
                    <div className={cn(
                        "flex-1 flex flex-col border-r transition-all duration-500",
                        phase === 'BLURT' ? "w-0 opacity-0 pointer-events-none hidden" : "w-1/2 opacity-100"
                    )}>
                        <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                            <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Source Material</span>
                            {phase === 'READ' && <Eye className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <ScrollArea className="flex-1 p-8 prose prose-lg dark:prose-invert max-w-none">
                            <h3>{title}</h3>
                            <p className="leading-loose">{content}</p>
                            <p className="leading-loose mt-4">
                                Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life.
                                Neuroplasticity allows the neurons (nerve cells) in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment.
                            </p>
                        </ScrollArea>
                    </div>

                    {/* RIGHT PANEL: User Input */}
                    <div className={cn(
                        "flex flex-col transition-all duration-500 bg-pink-50/10",
                        phase === 'READ' ? "w-0 opacity-0 hidden" : "flex-1 opacity-100"
                    )}>
                        <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                            <span className="font-semibold text-sm uppercase tracking-wider text-pink-600">Your Recall</span>
                            <EyeSlash className="w-4 h-4 text-pink-600" />
                        </div>
                        <Textarea
                            className="flex-1 resize-none p-8 font-serif text-lg leading-relaxed border-none focus-visible:ring-0 bg-transparent"
                            placeholder="Type everything you remember here..."
                            value={userNotes}
                            onChange={e => setUserNotes(e.target.value)}
                            disabled={phase === 'REVIEW'}
                        />
                    </div>
                </div>

                {/* --- Bottom Action Bar --- */}
                <div className="p-6 border-t bg-background/80 backdrop-blur-md flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        {phase === 'READ' && "Read carefully. The text will disappear when time is up."}
                        {phase === 'BLURT' && "Write down everything you remember. Don't worry about formatting."}
                        {phase === 'REVIEW' && "Compare your notes (Left) with the source (Right). Identify gaps."}
                    </div>

                    <div className="flex gap-4">
                        {phase === 'READ' && (
                            <Button onClick={handleStartBlurting} className="bg-pink-600 hover:bg-pink-700">
                                <EyeSlash className="w-4 h-4 mr-2" /> Start Blurting
                            </Button>
                        )}
                        {phase === 'BLURT' && (
                            <Button onClick={handleFinishBlurting} variant="default">
                                <Check className="w-4 h-4 mr-2" /> Finish & Review
                            </Button>
                        )}
                        {phase === 'REVIEW' && (
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold mr-4">
                                    <Warning className="w-4 h-4" />
                                    Check for missed details
                                </div>
                                <Button onClick={onBack} variant="outline">Done</Button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </StudySessionLayout>
    );
}
