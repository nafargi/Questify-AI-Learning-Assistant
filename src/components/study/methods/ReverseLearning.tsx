import { useState } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { ArrowLeft, ArrowRight, Code, Key, List, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ReverseLearning({ onBack }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [step, setStep] = useState(0);
    const [revealedSteps, setRevealedSteps] = useState<number[]>([]);

    const PROBLEM = {
        title: "How does React useFiber work?",
        solution_code: `
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
        `,
        principles: [
            "It breaks rendering work into small units.",
            "It checks the deadline to yield back to the browser.",
            "It uses 'requestIdleCallback' to schedule the next loop."
        ]
    };

    const toggleStep = (idx: number) => {
        if (revealedSteps.includes(idx)) {
            setRevealedSteps(prev => prev.filter(i => i !== idx));
        } else {
            setRevealedSteps(prev => [...prev, idx]);
        }
    };

    return (
        <StudySessionLayout
            title="Reverse Learning"
            subtitle="Deconstruct the Solution"
            icon={ArrowRight}
            color="text-cyan-500"
            onExit={onBack}
        >
            <div className="flex flex-col h-full bg-background relative overflow-hidden">
                <div className="flex-1 flex flex-col md:flex-row h-full">

                    {/* Left: The Solution (Result) */}
                    <div className="w-full md:w-1/2 p-6 border-r flex flex-col bg-slate-950 text-slate-100">
                        <div className="mb-6">
                            <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-2">The End Result</h3>
                            <h2 className="text-2xl font-bold">{PROBLEM.title}</h2>
                        </div>

                        <Card className="bg-slate-900 border-slate-800 p-6 flex-1 font-mono text-sm leading-relaxed overflow-hidden relative group">
                            <pre className="text-cyan-100/90 whitespace-pre-wrap">
                                {PROBLEM.solution_code}
                            </pre>
                        </Card>
                    </div>

                    {/* Right: The Breakdown (Principles) */}
                    <div className="w-full md:w-1/2 flex flex-col bg-cyan-50/20 dark:bg-cyan-950/10">
                        <div className="p-6 border-b bg-background/50 backdrop-blur">
                            <h3 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider text-xs mb-2">Working Backwards</h3>
                            <p className="text-sm text-muted-foreground">Identify the core principles that make this solution work.</p>
                        </div>

                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-4">
                                {PROBLEM.principles.map((principle, idx) => (
                                    <div key={idx} className="relative">
                                        <button
                                            onClick={() => toggleStep(idx)}
                                            className={cn(
                                                "w-full text-left p-4 border transition-all duration-300 flex items-start gap-4",
                                                revealedSteps.includes(idx)
                                                    ? "bg-background border-cyan-500 shadow-md"
                                                    : "bg-muted/50 border-transparent hover:bg-muted"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors",
                                                revealedSteps.includes(idx) ? "bg-cyan-500 text-white" : "bg-muted-foreground/30 text-muted-foreground"
                                            )}>
                                                {idx + 1}
                                            </div>

                                            <div className="flex-1">
                                                <div className={cn(
                                                    "font-medium transition-all duration-500",
                                                    revealedSteps.includes(idx) ? "blur-0" : "blur-sm opacity-50 select-none"
                                                )}>
                                                    {principle}
                                                </div>
                                                {!revealedSteps.includes(idx) && (
                                                    <div className="mt-2 text-xs text-cyan-600 font-bold uppercase tracking-wide">
                                                        Click to Reveal Principle
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="p-6 border-t bg-background">
                            <Button className="w-full bg-cyan-600 hover:bg-cyan-700 h-12 text-lg font-bold" disabled={revealedSteps.length < PROBLEM.principles.length}>
                                {revealedSteps.length < PROBLEM.principles.length
                                    ? `${revealedSteps.length}/${PROBLEM.principles.length} Principles Identified`
                                    : "Complete Analysis"}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </StudySessionLayout>
    );
}
