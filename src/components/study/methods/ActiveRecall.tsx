import { useState } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Brain, Eye, EyeSlash, ArrowCounterClockwise, Check, Sparkle, X, Target, MagicWand, ArrowRight } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_FLASHCARDS } from "@/data/mockFlashcards"; // Reusing for content

export function ActiveRecall({ onBack, bookFilename }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const questions = MOCK_FLASHCARDS;
    const currentQ = questions[currentIndex];
    const isComplete = currentIndex >= questions.length;

    const handleNext = (correct: boolean) => {
        setScore(prev => ({
            correct: prev.correct + (correct ? 1 : 0),
            total: prev.total + 1
        }));
        setIsAnswerVisible(false);
        setShowAnalysis(false);
        setLastAnalysis(null);
        setCurrentIndex(prev => prev + 1);
    };

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const analysis = `AI ANALYSIS: \nYour recall was strong, but you missed the subtle distinction between 'Abstract' and 'Interface'. In the context of this chapter, an interface defines a contract while an abstract class provides a partial implementation.`;
            setLastAnalysis(analysis);
            setShowAnalysis(true);
            setIsAnalyzing(false);
        }, 1200);
    };

    return (
        <StudySessionLayout
            title="Active Recall"
            subtitle="Self-Testing Protocol"
            icon={Brain}
            color="text-rose-500"
            onExit={onBack}
            rightAction={
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-rose-600 border-rose-200">
                    Accuracy: {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
                </Badge>
            }
        >
            <div className="flex h-full overflow-hidden">
                {/* --- MAIN AREA --- */}
                <div className="flex-1 flex flex-col bg-background/50 relative min-w-0">
                    <div className="p-6 border-b bg-card/30 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 max-w-xl">
                            <Progress value={(currentIndex / questions.length) * 100} className="h-2 flex-1" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase">{currentIndex} / {questions.length}</span>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        <div className="max-w-3xl mx-auto h-full flex flex-col justify-center gap-8 py-12">
                            {!isComplete ? (
                                <>
                                    {/* Question Card */}
                                    <div className="w-full relative">
                                        <Card className="p-8 md:p-12 shadow-2xl border-t-4 border-t-rose-500 relative overflow-hidden group bg-white">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/10 via-rose-500/30 to-rose-500/10" />
                                            <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Challenge {currentIndex + 1}</h3>
                                            <div className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-slate-800">
                                                {currentQ.question}
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Answer Section */}
                                    <div className="w-full relative min-h-[160px]">
                                        {isAnswerVisible ? (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                                <Card className="p-8 bg-rose-50 border-rose-100 border-2 shadow-sm relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                                        <Sparkle className="w-8 h-8 text-rose-600" />
                                                    </div>
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Model Answer</h3>
                                                    <p className="text-lg leading-relaxed text-slate-700 font-medium italic">{currentQ.answer}</p>
                                                </Card>

                                                <div className="flex gap-4 items-center">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 h-12 border-rose-200 text-rose-700 font-bold hover:bg-rose-50"
                                                        onClick={() => handleNext(false)}
                                                    >
                                                        <X className="w-4 h-4 mr-2" /> I Forgot This
                                                    </Button>
                                                    <Button
                                                        className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-900/20"
                                                        onClick={() => handleNext(true)}
                                                    >
                                                        <Check className="w-4 h-4 mr-2" /> Recalled Correctly
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={cn("h-12 w-12 rounded-xl text-amber-600 hover:bg-amber-50", isAnalyzing && "animate-spin")}
                                                        onClick={runAnalysis}
                                                        disabled={isAnalyzing}
                                                    >
                                                        <MagicWand className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsAnswerVisible(true)}
                                                className="w-full h-[200px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-600 transition-all group"
                                            >
                                                <Eye className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="font-black text-xs uppercase tracking-[0.2em]">Reveal Secret Answer</span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center space-y-8 animate-in zoom-in h-fit my-auto">
                                    <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-12">
                                        <Sparkle className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-black tracking-tighter">Session Complete</h2>
                                        <p className="text-muted-foreground font-medium">Your neurons have been successfully fired.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                                        <div className="bg-white p-6 rounded-2xl border shadow-sm ring-1 ring-black/5">
                                            <div className="text-3xl font-black text-rose-600">{Math.round((score.correct / score.total) * 100)}%</div>
                                            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1">Accuracy</div>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border shadow-sm ring-1 ring-black/5">
                                            <div className="text-3xl font-black text-slate-800">{questions.length}</div>
                                            <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-1">Items Refreshed</div>
                                        </div>
                                    </div>

                                    <Button size="lg" onClick={onBack} className="h-12 px-8 font-bold bg-slate-900">
                                        <ArrowCounterClockwise className="w-4 h-4 mr-2" /> Finish Protocol
                                    </Button>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* --- RIGHT PANEL: AI Feedback & Analysis --- */}
                <div className={cn(
                    "transition-all duration-500 border-l bg-slate-50 flex flex-col relative overflow-hidden",
                    showAnalysis ? "w-[30%] opacity-100" : "w-0 opacity-0 border-none"
                )}>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-rose-700">AI Neural Check</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowAnalysis(false)} className="h-6 w-6">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6">
                                {lastAnalysis && (
                                    <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                                                <Target className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm">Qualitative Feedback</span>
                                        </div>
                                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {lastAnalysis}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Concept Map</p>
                                    <div className="p-4 rounded-xl bg-rose-600/5 border border-rose-600/10 text-xs text-rose-800 leading-relaxed font-medium">
                                        Regular active recall for this concept is recommended every <strong>48 hours</strong> to maximize long-term retention.
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <Button
                            variant="outline"
                            className="mt-6 w-full border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs"
                            onClick={() => setShowAnalysis(false)}
                        >
                            Dismiss Analysis
                        </Button>
                    </div>
                </div>
            </div>
        </StudySessionLayout>
    );
}

