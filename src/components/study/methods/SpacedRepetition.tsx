import { useState } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Timer, Check, ArrowCounterClockwise } from "@phosphor-icons/react";
import { MOCK_FLASHCARDS, Flashcard } from "@/data/mockFlashcards";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export function SpacedRepetition({ onBack }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    // In a real app, we'd sort by 'nextReview' date. 
    // For now, we just take the first 5 cards as a "Due Today" simulation.
    const [queue, setQueue] = useState<Flashcard[]>(MOCK_FLASHCARDS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = queue[currentIndex];
    const isComplete = currentIndex >= queue.length;

    // Simulating SM-2 Algorithm intervals
    const RATINGS = [
        { label: 'Again', color: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200', interval: '< 1m' },
        { label: 'Hard', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200', interval: '2d' },
        { label: 'Good', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200', interval: '4d' },
        { label: 'Easy', color: 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200', interval: '7d' },
    ];

    const handleRating = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, 150);
    };

    return (
        <StudySessionLayout
            title="Spaced Repetition"
            subtitle="Daily Review"
            icon={Timer}
            color="text-orange-500"
            onExit={onBack}
        >
            <div className="h-full flex flex-col max-w-4xl mx-auto w-full p-6 gap-8">

                {/* --- Header / Stats --- */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Due Today</h2>
                        <p className="text-muted-foreground">{queue.length - currentIndex} cards remaining</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-orange-600">85%</div>
                        <div className="text-xs font-bold text-muted-foreground uppercase">Retention Rate</div>
                    </div>
                </div>

                <Progress value={(currentIndex / queue.length) * 100} className="h-2" />

                {/* --- Card Area --- */}
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <div className="w-full max-w-2xl perspective-1000">
                                <motion.div
                                    key={currentCard.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full aspect-[3/2] cursor-pointer"
                                    onClick={() => !isFlipped && setIsFlipped(true)}
                                >
                                    <div className={cn(
                                        "absolute inset-0 bg-card border shadow-xl p-10 flex flex-col items-center justify-center text-center transition-all duration-500",
                                        isFlipped ? "opacity-0 pointer-events-none rotate-x-180" : "opacity-100 rotate-x-0"
                                    )}>
                                        <h3 className="text-3xl font-bold leading-tight select-none">
                                            {currentCard.question}
                                        </h3>
                                        <p className="absolute bottom-8 text-sm text-muted-foreground font-medium animate-pulse">
                                            Tap to reveal answer
                                        </p>
                                    </div>

                                    <div className={cn(
                                        "absolute inset-0 bg-slate-900 text-white shadow-xl p-10 flex flex-col items-center justify-center text-center transition-all duration-500",
                                        isFlipped ? "opacity-100 rotate-x-0" : "opacity-0 pointer-events-none -rotate-x-180"
                                    )}>
                                        <p className="text-lg leading-relaxed select-none">
                                            {currentCard.answer}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Rating Controls */}
                                <div className={cn(
                                    "grid grid-cols-4 gap-4 mt-8 transition-all duration-300",
                                    isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                )}>
                                    {RATINGS.map((rate) => (
                                        <button
                                            key={rate.label}
                                            onClick={handleRating}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all hover:scale-105 active:scale-95",
                                                rate.color
                                            )}
                                        >
                                            <span className="font-bold">{rate.label}</span>
                                            <span className="text-xs opacity-70 mt-1">{rate.interval}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold">You're all caught up!</h2>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    There are no more cards due for review today. Check back tomorrow to strengthen those memory pathways.
                                </p>
                                <Button size="lg" variant="outline" onClick={onBack}>
                                    Return to Overview
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </StudySessionLayout>
    );
}
