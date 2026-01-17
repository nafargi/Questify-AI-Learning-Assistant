import { useState, useEffect } from "react";
import {
    BookOpen,
    StickyNote,
    Library,
    ChevronLeft,
    Maximize2,
    Minimize2,
    Settings2,
    Share2,
    Highlighter,
    Send,
    Sparkles,
    Bot
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChapterContent } from "@/components/study/ChapterContent";
import { useChapter } from "@/hooks/useChapter";
import { useNavigate } from "react-router-dom";

interface StandardReadMethodProps {
    chapterId: string;
    courseId: string;
    onBack: () => void;
}

export function StandardReadMethod({ chapterId, courseId, onBack }: StandardReadMethodProps) {
    const navigate = useNavigate();
    // Mock hooks for now if real data isn't ready
    const { chapterContent: chapter, isGenerating: isLoading, generateChapter } = useChapter();

    useEffect(() => {
        if (chapterId && !chapter) {
            generateChapter({
                courseName: courseId || 'Course',
                chapterTitle: chapterId
            });
        }
    }, [chapterId, courseId, chapter]);

    const [activeTab, setActiveTab] = useState("notes");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
    const [aiChat, setAiChat] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: "Hi! I'm your study companion. Highlight any text to ask me about it, or type a question below." }
    ]);

    const handleSendMessage = () => {
        if (!aiMessage.trim()) return;
        setAiChat([...aiChat, { role: 'user', content: aiMessage }]);
        setAiMessage("");
        // Simulate AI response
        setTimeout(() => {
            setAiChat(prev => [...prev, { role: 'ai', content: "That's a great question. Based on this chapter,..." }]);
        }, 1000);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden animate-fade-in">

            {/* Top Bar - Focus Header */}
            <header className="h-14 border-b flex items-center justify-between px-4 bg-background/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-muted rounded-full">
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    </Button>
                    <div>
                        <h1 className="text-sm font-bold flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            {chapterId || "Loading Chapter..."}
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            {courseId || "Course"} • Standard View • 15 min
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            </header>

            {/* Main Split View */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Pane: Content Reader (70%) */}
                <div className="flex-1 relative flex flex-col min-w-0 bg-dot-pattern">
                    <ScrollArea className="flex-1">
                        <div className="max-w-3xl mx-auto py-12 px-8">
                            {/* Paper Surface */}
                            <div className="bg-card border shadow-sm rounded-xl min-h-[800px] p-10 md:p-14 mb-20 relative">
                                {/* Reader Controls */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Highlighter className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings2 className="w-4 h-4" /></Button>
                                </div>

                                {isLoading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="h-8 bg-muted rounded w-3/4 mb-8"></div>
                                        <div className="h-4 bg-muted rounded w-full"></div>
                                        <div className="h-4 bg-muted rounded w-full"></div>
                                        <div className="h-4 bg-muted rounded w-5/6"></div>
                                    </div>
                                ) : (
                                    <ChapterContent
                                        content={chapter}
                                        title={chapterId || "Untitled"}
                                        courseName={courseId || "General"}
                                    />
                                )}
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Floating Progress Footer */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted group cursor-pointer">
                        <div className="h-full bg-primary w-[30%] group-hover:h-2 transition-all"></div>
                    </div>
                </div>

                {/* Right Pane: AI Toolbelt (30%) */}
                <div className="w-[350px] lg:w-[400px] border-l bg-card/50 backdrop-blur-sm flex flex-col shadow-xl z-20">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">

                        <div className="px-4 pt-4 pb-2 border-b">
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="notes" className="gap-2"><StickyNote className="w-4 h-4" /> Notes</TabsTrigger>
                                <TabsTrigger value="chat" className="gap-2"><Sparkles className="w-4 h-4" /> AI Chat</TabsTrigger>
                                <TabsTrigger value="cards" className="gap-2"><Library className="w-4 h-4" /> Cards</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Notes Tab */}
                        <TabsContent value="notes" className="flex-1 p-4 flex flex-col gap-4 m-0 data-[state=active]:flex">
                            <div className="flex-1 bg-background border rounded-lg p-4 shadow-inner relative group">
                                <textarea
                                    className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-sm leading-relaxed"
                                    placeholder="Type your notes here... (Markdown supported)"
                                />
                                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground">
                                    Saved
                                </div>
                            </div>
                            <Button className="w-full gap-2">
                                <Highlighter className="w-4 h-4" /> Capture Highlight
                            </Button>
                        </TabsContent>

                        {/* AI Chat Tab */}
                        <TabsContent value="chat" className="flex-1 flex flex-col m-0 data-[state=active]:flex">
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {aiChat.map((msg, i) => (
                                        <div key={i} className={cn("flex gap-3 text-sm", msg.role === 'user' ? "flex-row-reverse" : "")}>
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                msg.role === 'ai' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                            )}>
                                                {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : "Me"}
                                            </div>
                                            <div className={cn(
                                                "p-3 rounded-2xl max-w-[80%]",
                                                msg.role === 'ai' ? "bg-card border shadow-sm" : "bg-primary text-primary-foreground"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="p-3 border-t bg-background">
                                <div className="relative">
                                    <Textarea
                                        value={aiMessage}
                                        onChange={(e) => setAiMessage(e.target.value)}
                                        placeholder="Ask about the chapter..."
                                        className="pr-10 min-h-[50px] resize-none"
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-1 bottom-1 hover:bg-transparent text-primary"
                                        onClick={handleSendMessage}
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Flashcards Tab */}
                        <TabsContent value="cards" className="flex-1 p-4 m-0 data-[state=active]:flex flex-col gap-4">
                            <Card className="flex-1 border-dashed border-2 flex flex-col items-center justify-center text-center p-6 bg-muted/20">
                                <Library className="w-12 h-12 text-muted-foreground mb-4" />
                                <h3 className="font-semibold">Contextual Cards</h3>
                                <p className="text-sm text-muted-foreground mb-4">Select text to instantly generate a flashcard.</p>
                                <Button variant="outline">Generate from Chapter</Button>
                            </Card>
                            <div className="h-1/3 border rounded-lg p-4 bg-background">
                                <h4 className="font-bold text-xs uppercase text-muted-foreground mb-2">Review Queue</h4>
                                <div className="space-y-2">
                                    <div className="p-2 border rounded bg-card text-sm flex justify-between">
                                        <span>2NF Rules</span>
                                        <Badge variant="outline" className="text-[10px]">Hard</Badge>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>

            </div>
        </div>
    );
}
