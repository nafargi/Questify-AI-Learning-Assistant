import { useState } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Stack, ArrowCounterClockwise, Check, X, ArrowRight } from "@phosphor-icons/react";
import { MOCK_FLASHCARDS, Flashcard } from "@/data/mockFlashcards";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export function LeitnerSystem({ onBack }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [cards, setCards] = useState<Flashcard[]>(MOCK_FLASHCARDS);
    const [currentBox, setCurrentBox] = useState<number>(1);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Filter cards by current box for the active session
    const boxCards = cards.filter(c => c.box === currentBox);
    const activeCard = boxCards[activeCardIndex];
    const isSessionComplete = activeCardIndex >= boxCards.length;

    const handleRate = (correct: boolean) => {
        if (!activeCard) return;

        // Logic: Correct -> Box + 1, Incorrect -> Box 1
        const newBox = correct ? Math.min(activeCard.box + 1, 5) : 1;

        setCards(prev => prev.map(c =>
            c.id === activeCard.id ? { ...c, box: newBox as 1 | 2 | 3 | 4 | 5 } : c
        ));

        setIsFlipped(false);
        setTimeout(() => {
            setActiveCardIndex(prev => prev + 1);
        }, 150);
    };

    const getBoxCount = (boxNum: number) => cards.filter(c => c.box === boxNum).length;

    return (
        <StudySessionLayout
            title="Leitner System"
            subtitle="Spaced Repetition Boxes"
            icon={Stack}
            color="text-amber-500"
            onExit={onBack}
        >
            <div className="h-full flex flex-col max-w-5xl mx-auto w-full p-6 gap-8">

                {/* --- Top: Box Visualization --- */}
                <div className="grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map(box => (
                        <button
                            key={box}
                            onClick={() => {
                                setCurrentBox(box);
                                setActiveCardIndex(0);
                                setIsFlipped(false);
                            }}
                            className={cn(
                                "flex flex-col items-center p-4 border transition-all duration-300 relative overflow-hidden",
                                currentBox === box
                                    ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20"
                                    : "bg-card hover:bg-accent/50 hover:border-amber-300/50"
                            )}
                        >
                            <span className="text-xs font-bold text-muted-foreground uppercase mb-1">Box {box}</span>
                            <span className="text-2xl font-black text-foreground">{getBoxCount(box)}</span>
                            {currentBox === box && (
                                <motion.div
                                    layoutId="activeBox"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* --- Main Area --- */}
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!isSessionComplete ? (
                            <div className="w-full max-w-2xl perspective-1000">
                                <motion.div
                                    key={activeCard.id}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className={cn(
                                        "relative w-full aspect-[3/2] cursor-pointer preserve-3d transition-transform duration-500",
                                        isFlipped ? "rotate-y-180" : ""
                                    )}
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    {/* Front */}
                                    <div className="absolute inset-0 backface-hidden bg-card border shadow-xl p-10 flex flex-col items-center justify-center text-center">
                                        <Badge variant="outline" className="mb-6">{activeCard.topic}</Badge>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                            {activeCard.question}
                                        </h3>
                                        <p className="absolute bottom-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                                            Click to Flip
                                        </p>
                                    </div>

                                    {/* Back */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-slate-50 border shadow-xl p-10 flex flex-col items-center justify-center text-center">
                                        <div className="prose prose-invert prose-lg">
                                            <p>{activeCard.answer}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-32 hover:bg-red-100 hover:text-red-700 hover:border-red-200 dark:hover:bg-red-900/30"
                                        onClick={() => handleRate(false)}
                                    >
                                        <X className="w-4 h-4 mr-2" /> Incorrect
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="w-32 bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => handleRate(true)}
                                    >
                                        <Check className="w-4 h-4 mr-2" /> Correct
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-6 animate-in zoom-in duration-300">
                                <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold">Box {currentBox} Complete!</h2>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    You've reviewed all cards in this box. Great job keeping your memory fresh.
                                </p>
                                <Button size="lg" onClick={() => {
                                    setCurrentBox(1);
                                    setActiveCardIndex(0);
                                }}>
                                    <ArrowCounterClockwise className="w-4 h-4 mr-2" /> Review Box 1
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Progress Bar --- */}
                <div className="w-full max-w-2xl mx-auto space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Progress</span>
                        <span>{Math.min(activeCardIndex, boxCards.length)} / {boxCards.length}</span>
                    </div>
                    <Progress value={(activeCardIndex / boxCards.length) * 100} className="h-2" />
                </div>

            </div>
        </StudySessionLayout>
    );
}
