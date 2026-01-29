import { useState, useRef, useEffect } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Brain, PaperPlaneTilt, User, Robot, Sparkle, Microphone, ArrowLeft, ArrowRight, BookOpen, Target } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@/components/study/PDFViewer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
    isThinking?: boolean;
}

export function TeachingSimulation({ onBack, chapterId, bookFilename }: { onBack: () => void; bookFilename?: string; chapterId?: string; courseId?: string }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: `Hi Professor! I'm struggling to understand ${chapterId || "this topic"}. Can you explain the main concept to me in simple terms?`,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [isSourceVisible, setIsSourceVisible] = useState(true);
    const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");
        setIsAiThinking(true);

        // Simulate AI Response + Analysis
        setTimeout(() => {
            const responses = [
                "Oh, I see! So it's similar to how a library organizes books?",
                "Wait, but what happens if the input is null?",
                "That makes sense. But could you give me a real-world example?",
                "I'm a bit confused about that last part. Can you break it down further?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const analysis = "SYSTEM CHECK: \nAccuracy: 85% \nMissing Concepts: Temporal Locality, Cache Invalidation. \n\nElaboration: The user correctly identified spatial locality but failed to explain how the OS manages the page table during this process.";

            setLastAnalysis(analysis);
            setShowAnalysis(true);

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: randomResponse,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsAiThinking(false);
        }, 1500);
    };

    return (
        <StudySessionLayout
            title="Teaching Simulation"
            subtitle="AI Student Mode"
            icon={Brain}
            color="text-teal-500"
            onExit={onBack}
            rightAction={
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-teal-600 border-teal-200">
                    Mode: Active Teaching
                </Badge>
            }
        >
            <div className="flex h-full overflow-hidden">
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
                                Reference Material
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CENTER PANEL: Chat Area --- */}
                <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm shadow-2xl min-w-0">
                    <ScrollArea className="flex-1 p-6 pb-0">
                        <div className="space-y-6 pb-6 mt-4 max-w-2xl mx-auto w-full">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-4 max-w-[90%]",
                                        msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <Avatar className={cn("w-10 h-10 border-2 shrink-0", msg.sender === 'ai' ? "border-teal-200" : "border-primary/20")}>
                                        <AvatarFallback>{msg.sender === 'ai' ? <Robot className="w-6 h-6 text-teal-600" /> : <User className="w-6 h-6" />}</AvatarFallback>
                                    </Avatar>

                                    <div className={cn(
                                        "p-4 rounded-2xl shadow-sm text-sm leading-relaxed ring-1 ring-black/5",
                                        msg.sender === 'ai'
                                            ? "bg-white text-slate-800 rounded-tl-none border border-teal-50"
                                            : "bg-teal-600 text-white rounded-tr-none px-5"
                                    )}>
                                        {msg.text}
                                        <div className={cn("text-[10px] mt-2 opacity-50 font-bold tracking-wider", msg.sender === 'user' && "text-right")}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isAiThinking && (
                                <div className="flex gap-4 animate-in fade-in">
                                    <Avatar className="w-10 h-10 border-2 border-teal-200">
                                        <AvatarFallback><Robot className="w-6 h-6 text-teal-600" /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2 shadow-sm ring-1 ring-black/5">
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-6 bg-background border-t">
                        <div className="relative flex items-center gap-3 max-w-2xl mx-auto">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-teal-600 shrink-0 h-10 w-10">
                                <Microphone className="w-5 h-5" />
                            </Button>
                            <div className="flex-1 relative">
                                <Input
                                    value={inputText}
                                    onChange={e => setInputText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Teach me the concept..."
                                    className="rounded-full pl-6 pr-14 py-6 bg-slate-100/50 border-transparent focus:border-teal-500/50 focus:bg-background transition-all"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-1.5 top-1.5 rounded-full w-9 h-9 bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/20"
                                    onClick={handleSend}
                                    disabled={!inputText.trim() || isAiThinking}
                                >
                                    <PaperPlaneTilt className="w-4 h-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: Analysis & Elaboration --- */}
                <div className={cn(
                    "transition-all duration-500 border-l bg-slate-50 flex flex-col relative overflow-hidden",
                    showAnalysis ? "w-[30%] opacity-100" : "w-0 opacity-0 border-none"
                )}>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-teal-700">System Accuracy Check</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowAnalysis(false)} className="h-6 w-6">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6">
                                {lastAnalysis && (
                                    <div className="p-5 rounded-2xl bg-white border border-teal-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-teal-100 text-teal-600">
                                                <Target className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm">Teaching Evaluation</span>
                                        </div>
                                        <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {lastAnalysis}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Elaboration Advice</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">
                                            <strong>Pro Tip:</strong> You can use the Feynman technique of simplification to explain things better.
                                        </div>
                                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-800">
                                            The student is interested in <strong>real-world applications</strong>. Try relating this to a phone or PC.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <Button
                            variant="outline"
                            className="mt-6 w-full border-teal-200 text-teal-700 hover:bg-teal-50 font-bold text-xs"
                            onClick={() => setShowAnalysis(false)}
                        >
                            Dismiss Check
                        </Button>
                    </div>
                </div>

            </div>
        </StudySessionLayout>
    );
}
