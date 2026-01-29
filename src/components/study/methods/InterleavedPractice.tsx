import { useState, useEffect } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Stack, Shuffle, Timer, ArrowRight, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MOCK_FLASHCARDS } from "@/data/mockFlashcards"; // Using flashcards as "problems"

export function InterleavedPractice({ onBack }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per block
    const [currentTopicIdx, setCurrentTopicIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const TOPICS = [
        { name: "JavaScript", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-200" },
        { name: "Databases", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-200" },
        { name: "Networking", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-200" }
    ];

    const currentTopic = TOPICS[currentTopicIdx];

    // Filter questions for current topic
    const topicQuestions = MOCK_FLASHCARDS.filter(q => q.topic === currentTopic.name) || MOCK_FLASHCARDS.slice(0, 2);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            // Time up! Switch topic
            handleSwitchTopic();
        }
        return () => clearInterval(interval);
    }, [isPaused, timeLeft]);

    const handleSwitchTopic = () => {
        setCurrentTopicIdx(prev => (prev + 1) % TOPICS.length);
        setTimeLeft(300); // Reset timer
        // Play sound effect hook here
    };

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <StudySessionLayout
            title="Interleaved Practice"
            subtitle="Mixed Topic Training"
            icon={Shuffle}
            color="text-indigo-500"
            onExit={onBack}
            rightAction={
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-mono font-bold text-xl tabular-nums text-foreground/80">
                        <Timer className="w-5 h-5 text-muted-foreground" />
                        {formatTime(timeLeft)}
                    </div>
                </div>
            }
        >
            <div className="flex flex-col h-full overflow-hidden bg-background">

                {/* --- Context Bar --- */}
                <div className="h-2 flex w-full">
                    {TOPICS.map((topic, idx) => (
                        <div
                            key={topic.name}
                            className={cn(
                                "h-full transition-all duration-500",
                                idx === currentTopicIdx ? "flex-[2] opacity-100" : "flex-1 opacity-30 blur-sm",
                                topic.bg.replace('/10', '') // stronger color for bar
                            )}
                            style={{ backgroundColor: idx === currentTopicIdx ? undefined : undefined }}
                        />
                    ))}
                </div>

                <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center max-w-5xl mx-auto w-full gap-12">

                    {/* Active Topic Banner */}
                    <div className={cn(
                        "flex items-center gap-4 px-6 py-3 rounded-full border shadow-sm animate-in slide-in-from-top-4",
                        currentTopic.bg,
                        currentTopic.border
                    )}>
                        <Stack className={cn("w-5 h-5", currentTopic.color)} />
                        <span className={cn("font-bold text-lg", currentTopic.color)}>
                            Current Focus: {currentTopic.name}
                        </span>
                    </div>

                    {/* Content Area */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        {topicQuestions.slice(0, 2).map((q, i) => (
                            <Card key={q.id} className="p-8 flex flex-col gap-4 hover:shadow-lg transition-all group border-l-4" style={{ borderLeftColor: 'currentColor' }}>
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Problem {i + 1}</span>
                                    <Lightning className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-xl font-bold leading-snug">
                                    {q.question}
                                </h3>
                                <div className="mt-auto pt-4 flex justify-end">
                                    <Button variant="outline" size="sm">Show Solution</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Why Interleaving? Info Box */}
                    <div className="max-w-xl text-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Neuroscience Note</p>
                        <p className="text-sm text-muted-foreground">
                            Mixing related but different topics forces your brain to constantly retrieve information, strengthing neural connections better than "blocked" practice.
                        </p>
                    </div>

                    {/* Manual Switch */}
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={handleSwitchTopic}
                        className="gap-2 group"
                    >
                        Switch Topic Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                </div>

            </div>
        </StudySessionLayout>
    );
}
