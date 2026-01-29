
import { useState, useEffect } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { ChatCircle, ArrowRight, ArrowLeft, MagicWand, CheckCircle, BookOpen, PaperPlaneTilt, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { PDFViewer } from "@/components/study/PDFViewer";
import { Badge } from "@/components/ui/badge";

type InteractionState = 'AI_ASKING' | 'USER_ANSWERING' | 'AI_EVALUATING';

// Mock specific Feynman prompts for the deep content
const FEYNMAN_PROMPTS = {
    audience: "Junior Developer (Level 2)",
    persona: "I know basic syntax, but I don't get *why* this works. Explain it like we are debugging together."
};

interface FeynmanMethodProps {
    chapterId: string;
    courseId: string;
    bookFilename?: string;
    onBack: () => void;
}

export function FeynmanMethod({ chapterId, courseId, bookFilename, onBack }: FeynmanMethodProps) {
    const [interactionState, setInteractionState] = useState<InteractionState>('AI_ASKING');
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user', text: string, type?: 'critique' | 'question' }>>([
        {
            sender: 'ai',
            text: "I've reviewed the material. I'm going to quiz you to see if you truly understand it. Ready for the first question?",
            type: 'question'
        }
    ]);
    const [isSourceVisible, setIsSourceVisible] = useState(true);
    const [lastCritique, setLastCritique] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Mock AI Logic
    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        // 1. Add User Answer
        const newHistory = [...chatHistory, { sender: 'user' as const, text: userInput }];
        setChatHistory(newHistory);
        setUserInput("");
        setInteractionState('AI_EVALUATING');

        // 2. Simulate AI Analysis & Response
        setTimeout(() => {
            const critique = "That's partially correct. You mentioned the core concept, but you missed *why* it works in this specific case. \n\nCheck page 5 of the PDF - specifically the section on 'Memory Allocation'. \n\nTry to explain it again, focusing on that aspect.";
            const followUp = "Good start! But can you elaborate on how this relates to performance?";

            setLastCritique(critique);
            setShowFeedback(true);

            setChatHistory(prev => [...prev, {
                sender: 'ai',
                text: followUp,
                type: 'question'
            }]);

            setInteractionState('USER_ANSWERING');
        }, 2000);
    };

    const startSession = () => {
        setInteractionState('USER_ANSWERING');
        setChatHistory(prev => [...prev, {
            sender: 'ai',
            text: "Great. Based on this book, explain to me: **What is the primary difference between Lexical and Dynamic Scope?** assume I am a 5 year old.",
            type: 'question'
        }]);
    };

    return (
        <StudySessionLayout
            title="Feynman Teaching Studio"
            subtitle={bookFilename}
            icon={ChatCircle}
            color="text-green-500"
            onExit={onBack}
            rightAction={
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-teal-600 border-teal-200">
                        Level: Beginner
                    </Badge>
                    <Badge variant={interactionState === 'AI_EVALUATING' ? "secondary" : "default"}>
                        {interactionState === 'AI_EVALUATING' ? 'AI Analyzing...' : 'Your Turn to Teach'}
                    </Badge>
                </div>
            }
        >
            <div className="flex h-full animate-in fade-in duration-500 overflow-hidden">
                {/* --- LEFT PANEL: PDF Source --- */}
                <div className={cn(
                    "transition-all duration-500 relative border-r overflow-hidden flex flex-col bg-slate-50",
                    isSourceVisible ? "w-[40%] opacity-100" : "w-12 opacity-80"
                )}>
                    {isSourceVisible ? (
                        <>
                            {bookFilename && <PDFViewer filename={bookFilename} />}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 z-50 bg-white/80 backdrop-blur shadow-sm h-8 w-8 p-0"
                                onClick={() => setIsSourceVisible(false)}
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center pt-4 gap-4">
                            <Button variant="ghost" size="icon" onClick={() => setIsSourceVisible(true)} className="h-10 w-10">
                                <BookOpen className="w-6 h-6 text-teal-600" />
                            </Button>
                            <div className="writing-mode-vertical text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                                Source Material
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CENTER PANEL: Interaction Area --- */}
                <div className="flex-1 flex flex-col relative bg-dot-pattern min-w-0">
                    <div className="flex-1 flex flex-col h-full max-w-2xl mx-auto w-full p-6 pb-0 gap-6">
                        {/* Chat / Dialogue Stream */}
                        <ScrollArea className="flex-1 pr-4 -mr-4">
                            <div className="space-y-6 pb-6 mt-4">
                                {chatHistory.map((msg, idx) => (
                                    <div key={idx} className={cn(
                                        "flex flex-col gap-2 max-w-[90%]",
                                        msg.sender === 'user' ? "items-end ml-auto" : "items-start"
                                    )}>
                                        <div className="flex items-center gap-2 px-1">
                                            {msg.sender === 'ai' && <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />}
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                                {msg.sender === 'ai' ? 'The Student' : 'Professor You'}
                                            </span>
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ring-1 ring-black/5",
                                            msg.sender === 'ai'
                                                ? "bg-white text-slate-800 rounded-tl-none border-teal-100"
                                                : "bg-teal-600 text-white rounded-tr-none shadow-teal-900/10"
                                        )}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {interactionState === 'AI_EVALUATING' && (
                                    <div className="flex items-center gap-3 text-teal-600 text-xs font-bold animate-pulse ml-2 mt-4">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span>Student is processing your explanation...</span>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="pt-4 pb-6 mt-auto">
                            {chatHistory.length === 1 ? (
                                <Button onClick={startSession} className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-base font-bold shadow-xl shadow-teal-500/20" size="lg">
                                    I'm Ready. Ask me a question!
                                </Button>
                            ) : (
                                <Card className="p-2 flex flex-col gap-2 shadow-2xl border-teal-500/20 bg-background/95 backdrop-blur items-stretch">
                                    <Textarea
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Explain the concepts simply..."
                                        className="resize-none border-none focus-visible:ring-0 min-h-[100px] text-sm leading-relaxed"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <div className="flex justify-between items-center px-3 py-2 border-t border-slate-100">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Shift+Enter for newline</span>
                                        <Button
                                            size="sm"
                                            onClick={handleSendMessage}
                                            disabled={!userInput.trim() || interactionState === 'AI_EVALUATING'}
                                            className="bg-teal-600 hover:bg-teal-700 text-xs font-bold gap-2 pl-4"
                                        >
                                            Submit Explanation
                                            <div className="bg-white/20 p-1 rounded-md">
                                                <PaperPlaneTilt className="w-3.5 h-3.5" />
                                            </div>
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: AI Feedback & Elaboration --- */}
                <div className={cn(
                    "transition-all duration-500 border-l bg-slate-50 flex flex-col relative overflow-hidden",
                    showFeedback ? "w-[30%] opacity-100" : "w-0 opacity-0 border-none"
                )}>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-teal-700">Detailed Feedback</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowFeedback(false)} className="h-6 w-6">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6">
                                {lastCritique && (
                                    <div className="p-5 rounded-2xl bg-white border border-teal-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                                                <MagicWand className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm">Critical Insights</span>
                                        </div>
                                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap italic">
                                            {lastCritique}
                                        </div>
                                        <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">Improved Accuracy</Badge>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Study Advice</p>
                                    <div className="p-4 rounded-xl bg-teal-600/5 border border-teal-600/10 text-xs text-teal-800 leading-relaxed font-medium">
                                        The student seems confused about the 'Lexical' vs 'Dynamic' distinction.
                                        Try using a real-world analogy involving a library or a hierarchy.
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <Button
                            variant="outline"
                            className="mt-6 w-full border-teal-200 text-teal-700 hover:bg-teal-50 font-bold text-xs"
                            onClick={() => setShowFeedback(false)}
                        >
                            Back to Chat
                        </Button>
                    </div>
                </div>
            </div>
        </StudySessionLayout>
    );
}

