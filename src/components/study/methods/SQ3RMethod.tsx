import { useState } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { MagnifyingGlass, CaretRight, CheckCircle, BookOpen, Pen } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

// Shared types for the content
import { MOCK_CHAPTERS } from "@/data/mockChapters";

export function SQ3RMethod({ onBack, chapterId }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
    const STEPS = [
        { id: 'survey', label: 'Survey', icon: MagnifyingGlass, desc: "Skim headings and summaries." },
        { id: 'question', label: 'Question', icon: Pen, desc: "Turn headings into questions." },
        { id: 'read', label: 'Read', icon: BookOpen, desc: "Read to answer your questions." },
        { id: 'recite', label: 'Recite', icon: CaretRight, desc: "Summarize from memory." },
        { id: 'review', label: 'Review', icon: CheckCircle, desc: "Refine your mental model." },
    ];

    // Mock content based on chapterId or default
    const content = MOCK_CHAPTERS[chapterId || ''] || MOCK_CHAPTERS['Database Normalization'] || {
        sections: [{ title: 'Introduction', content: '...' }]
    };

    const handleNext = () => {
        if (step < 4) setStep(prev => (prev + 1) as any);
    };

    return (
        <StudySessionLayout
            title="SQ3R Method"
            subtitle={STEPS[step].label + " Phase"}
            icon={STEPS[step].icon}
            color="text-purple-500"
            onExit={onBack}
        >
            <div className="flex h-full">

                {/* --- sidebar: Stepper --- */}
                <div className="w-64 border-r bg-muted/10 flex flex-col p-4">
                    <div className="space-y-2">
                        {STEPS.map((s, idx) => (
                            <div key={s.id} className={cn(
                                "flex items-center gap-3 p-3 rounded-lg transition-colors text-sm",
                                idx === step ? "bg-purple-100 text-purple-700 font-bold" : "text-muted-foreground",
                                idx < step && "opacity-50"
                            )}>
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs border",
                                    idx === step ? "border-purple-500 bg-white" : "border-muted-foreground/30"
                                )}>
                                    {idx < step ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                                </div>
                                <div className="flex flex-col">
                                    <span>{s.label}</span>
                                    {idx === step && <span className="text-[10px] font-normal leading-tight opacity-80">{s.desc}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="flex-1 flex flex-col relative bg-card">
                    <ScrollArea className="flex-1 p-8 md:p-12">
                        <div className="max-w-3xl mx-auto space-y-8">

                            {/* PHASE: SURVEY (Headings Only) */}
                            {step === 0 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg text-purple-800 text-sm mb-8 flex gap-3">
                                        <MagnifyingGlass className="w-5 h-5 shrink-0" />
                                        <p>Don't read word-for-word yet. Just scan the titles, bold text, and summaries to build a mental map.</p>
                                    </div>
                                    <h1 className="text-4xl font-black">{chapterId || "Chapter Title"}</h1>
                                    {content.sections?.map((sec: any, i: number) => (
                                        <div key={i} className="py-4 border-b">
                                            <h2 className="text-2xl font-bold mb-2">{sec.title}</h2>
                                            <p className="text-muted-foreground line-clamp-2 italic opacity-50">
                                                {sec.content.substring(0, 150)}...
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PHASE: QUESTION (Input fields) */}
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in">
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm mb-8 flex gap-3">
                                        <Pen className="w-5 h-5 shrink-0" />
                                        <p>Turn the headings into questions. What do you expect to learn from this section?</p>
                                    </div>
                                    {content.sections?.map((sec: any, i: number) => (
                                        <div key={i} className="space-y-3">
                                            <h2 className="text-xl font-bold">{sec.title}</h2>
                                            <Textarea placeholder={`Write a question about "${sec.title}"...`} className="bg-muted/30" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PHASE: READ (Full Content) */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-green-800 text-sm mb-8 flex gap-3">
                                        <BookOpen className="w-5 h-5 shrink-0" />
                                        <p>Now read the full text actively to find the answers to your questions.</p>
                                    </div>
                                    {content.sections?.map((sec: any, i: number) => (
                                        <div key={i} className="prose dark:prose-invert max-w-none">
                                            <h3>{sec.title}</h3>
                                            <p>{sec.content}</p>
                                            {sec.subsections?.map((sub: any, j: number) => (
                                                <div key={j} className="pl-4 border-l-2 border-muted mt-4">
                                                    <h4 className="font-bold">{sub.title}</h4>
                                                    <p>{sub.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PHASE: RECITE (Hidden Content) */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg text-amber-800 text-sm mb-8 flex gap-3">
                                        <CaretRight className="w-5 h-5 shrink-0" />
                                        <p>Test yourself. Look away from the text and summarize the key points in your own words.</p>
                                    </div>
                                    {content.sections?.map((sec: any, i: number) => (
                                        <div key={i} className="space-y-2">
                                            <h3 className="font-bold text-muted-foreground">{sec.title}</h3>
                                            <Textarea className="min-h-[100px]" placeholder="Summarize key concepts from memory..." />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PHASE: REVIEW (Summary) */}
                            {step === 4 && (
                                <div className="space-y-6 text-center py-12 animate-in zoom-in">
                                    <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-bold">Session Complete!</h2>
                                    <p className="text-muted-foreground max-w-lg mx-auto">
                                        You've systematically processed this chapter. By questioning and reciting, you've built stronger memory pathways than just reading alone.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                                        <div className="p-4 rounded-lg border bg-muted/20">
                                            <div className="text-2xl font-bold">12</div>
                                            <div className="text-xs uppercase text-muted-foreground">Original Questions</div>
                                        </div>
                                        <div className="p-4 rounded-lg border bg-muted/20">
                                            <div className="text-2xl font-bold">850</div>
                                            <div className="text-xs uppercase text-muted-foreground">Words Recited</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </ScrollArea>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-background/80 backdrop-blur flex justify-end">
                        {step < 4 ? (
                            <Button onClick={handleNext} className="gap-2">
                                Next Step <CaretRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button onClick={onBack} variant="outline">Back to Menu</Button>
                        )}
                    </div>
                </div>
            </div>
        </StudySessionLayout>
    );
}
