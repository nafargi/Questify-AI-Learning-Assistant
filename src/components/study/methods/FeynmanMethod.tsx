import { useState, useEffect, useRef } from "react";
import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { MessageSquare, BookOpen, Code, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FEYNMAN_DATA, FeynmanConcept } from "@/data/MockFeynmanData";

// --- Types ---
type Phase = 'BLURT' | 'DEEP_DIVE' | 'SIMPLIFY' | 'CODE_APPLY';

interface FeynmanMethodProps {
    chapterId: string;
    courseId: string;
    onBack: () => void;
}

export function FeynmanMethod({ chapterId, courseId, onBack }: FeynmanMethodProps) {
    const [currentPhase, setCurrentPhase] = useState<Phase>('BLURT');
    const [activeConceptIndex, setActiveConceptIndex] = useState(0);
    const [explanation, setExplanation] = useState("");
    const [codeAttempt, setCodeAttempt] = useState("");
    const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user', text: string }>>([]);
    const [isTyping, setIsTyping] = useState(false);

    const activeConcept = FEYNMAN_DATA.concepts[activeConceptIndex];

    // --- Initial Greeting ---
    useEffect(() => {
        if (chatHistory.length === 0) {
            simulateAiResponse(`Hi! I'm your student today. I'm a ${FEYNMAN_DATA.audienceLevels[0].label}. I have no idea what "${FEYNMAN_DATA.topic}" is. Can you explain the basic definition to me?`);
        }
    }, []);

    // --- Helpers ---
    const simulateAiResponse = (text: string) => {
        setIsTyping(true);
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: 'ai', text }]);
            setIsTyping(false);
        }, 1500);
    };

    const handlePhaseComplete = () => {
        if (currentPhase === 'BLURT') {
            simulateAiResponse("Wait, that sounds complicated. Can you check the reference material and verify if your definition matches usage in memory?");
            setCurrentPhase('DEEP_DIVE');
        } else if (currentPhase === 'DEEP_DIVE') {
            simulateAiResponse(`Okay, I think I get the technical part. ${activeConcept.analogyPrompt}`);
            setCurrentPhase('SIMPLIFY');
        } else if (currentPhase === 'SIMPLIFY') {
            if (activeConcept.codeChallenge) {
                simulateAiResponse("Interesting analogy! Now, can you show me this in actual code? I tried waiting for a variable in a loop once and it failed.");
                setCodeAttempt(activeConcept.codeChallenge.initialCode);
                setCurrentPhase('CODE_APPLY');
            } else {
                // Move to next concept or finish
                handleNextConcept();
            }
        } else if (currentPhase === 'CODE_APPLY') {
            handleNextConcept();
        }
    };

    const handleNextConcept = () => {
        if (activeConceptIndex < FEYNMAN_DATA.concepts.length - 1) {
            setActiveConceptIndex(prev => prev + 1);
            setCurrentPhase('BLURT');
            setExplanation("");
            setCodeAttempt("");
            simulateAiResponse(`Nice! Now let's talk about **${FEYNMAN_DATA.concepts[activeConceptIndex + 1].title}**. What is that?`);
        } else {
            simulateAiResponse("Wow, I think I actually understand Closures now! Thanks, Teacher!");
        }
    };

    return (
        <StudySessionLayout
            title="Feynman Teaching Studio"
            subtitle={`Target Audience: ${FEYNMAN_DATA.audienceLevels[0].label}`}
            icon={MessageSquare}
            color="text-green-500"
            onExit={onBack}
        >
            <div className="flex h-full">
                {/* --- LEFT PANEL: Source Material (Initially Hidden/Collapsed) --- */}
                <div className={cn(
                    "w-1/3 border-r bg-muted/10 flex flex-col transition-all duration-500 overflow-hidden",
                    currentPhase === 'DEEP_DIVE' ? "opacity-100" : "w-0 opacity-0"
                )}>
                    <div className="p-4 border-b bg-muted/20">
                        <h3 className="font-semibold flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Reference Library
                        </h3>
                    </div>
                    <ScrollArea className="flex-1 p-6">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <h4>{activeConcept.title}</h4>
                            <div className="whitespace-pre-wrap font-serif leading-relaxed text-muted-foreground">
                                {activeConcept.content}
                            </div>
                        </div>
                        <Button className="w-full mt-8" onClick={handlePhaseComplete}>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            I've Reviewed the Concepts
                        </Button>
                    </ScrollArea>
                </div>

                {/* --- CENTER PANEL: The Stage --- */}
                <div className="flex-1 flex flex-col relative bg-dot-pattern">
                    <div className="flex-1 p-8 max-w-3xl mx-auto w-full flex flex-col gap-6">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Topic: <span className="font-bold text-foreground">{FEYNMAN_DATA.topic}</span></span>
                            <span>Phase: <span className={cn("font-bold uppercase",
                                currentPhase === 'BLURT' ? 'text-rose-500' :
                                    currentPhase === 'SIMPLIFY' ? 'text-purple-500' : 'text-blue-500'
                            )}>{currentPhase.replace('_', ' ')}</span></span>
                        </div>

                        {/* Editor Area */}
                        <Card className="flex-1 border-2 border-primary/10 shadow-lg flex flex-col overflow-hidden">
                            {currentPhase === 'CODE_APPLY' ? (
                                <div className="flex-1 flex flex-col bg-[#1e1e1e] text-white font-mono text-sm">
                                    <div className="p-2 border-b border-white/10 flex justify-between items-center text-xs text-white/50">
                                        <span>script.js</span>
                                        <span>node v18.0.0</span>
                                    </div>
                                    <textarea
                                        value={codeAttempt}
                                        onChange={(e) => setCodeAttempt(e.target.value)}
                                        className="flex-1 bg-transparent p-4 resize-none focus:outline-none"
                                        spellCheck={false}
                                    />
                                </div>
                            ) : (
                                <Textarea
                                    value={explanation}
                                    onChange={(e) => setExplanation(e.target.value)}
                                    placeholder={
                                        currentPhase === 'BLURT' ? "Type your explanation here..." :
                                            currentPhase === 'SIMPLIFY' ? "Write your analogy here..." :
                                                "Refine your notes..."
                                    }
                                    className="flex-1 resize-none border-none p-6 text-lg leading-relaxed focus-visible:ring-0"
                                />
                            )}

                            {/* Action Bar */}
                            <div className="p-4 border-t bg-muted/30 flex justify-end gap-3">
                                <Button variant="ghost" size="sm">
                                    <Wand2 className="w-4 h-4 mr-2" /> AI Hint
                                </Button>
                                {currentPhase !== 'DEEP_DIVE' && (
                                    <Button onClick={handlePhaseComplete}>
                                        {currentPhase === 'CODE_APPLY' ? 'Run Code' : 'Submit Explanation'}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* --- RIGHT PANEL: The Sim-Student --- */}
                <div className="w-80 border-l bg-card flex flex-col">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Student (AI)
                        </h3>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={cn(
                                    "p-3 rounded-lg text-sm max-w-[90%]",
                                    msg.sender === 'ai' ? "bg-muted text-foreground self-start rounded-tl-none" : "bg-primary text-primary-foreground self-end ml-auto rounded-tr-none"
                                )}>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="text-xs text-muted-foreground animate-pulse ml-2">
                                    Student is thinking...
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </StudySessionLayout>
    );
}
