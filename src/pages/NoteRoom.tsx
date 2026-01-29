import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CaretLeft,
    Highlighter,
    TextT,
    ShareNetwork,
    Download,
    Layout,
    List,
    SquaresFour
} from "@phosphor-icons/react";
import { TopicMaster } from '@/data/mockTopics';
import { noteMethods } from '@/data/mockData';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import all renderers
import { CornellNote } from '@/components/notes/CornellNote';
import { OutlineNote } from '@/components/notes/OutlineNote';
import { MindMapNote } from '@/components/notes/MindMapNote';
import { ChartingNote } from '@/components/notes/ChartingNote';
import { BoxingNote } from '@/components/notes/BoxingNote';
import { ZettelkastenNote } from '@/components/notes/ZettelkastenNote';
import { FeynmanNote } from '@/components/notes/FeynmanNote';
import { FlowchartNote } from '@/components/notes/FlowchartNote';
import { SentenceNote } from '@/components/notes/SentenceNote';
import { SketchNote } from '@/components/notes/SketchNote';

interface NoteRoomProps {
    topic: TopicMaster;
    initialMethod: string;
    onClose: () => void;
}

export default function NoteRoom({ topic, initialMethod, onClose }: NoteRoomProps) {
    const [currentMethod, setCurrentMethod] = useState(initialMethod);
    const [activeHighlight, setActiveHighlight] = useState(false);

    // Get the specific aspect of content based on method
    // In a real app, you might lazily fetch this. Here we just key into the object.
    const activeContent = (topic as any)[currentMethod];

    const currentMethodInfo = noteMethods.find(m => m.id === currentMethod);

    const renderContent = () => {
        if (!activeContent) return <div className="p-20 text-center text-muted-foreground">Content not available for this view.</div>;

        switch (currentMethod) {
            case 'cornell': return <CornellNote content={activeContent} />;
            case 'outline': return <OutlineNote content={activeContent} />;
            case 'mindmap': return <MindMapNote content={activeContent} />;
            case 'charting': return <ChartingNote content={activeContent} />;
            case 'boxing': return <BoxingNote content={activeContent} />;
            case 'zettelkasten': return <ZettelkastenNote content={activeContent} />;
            case 'feynman': return <FeynmanNote content={activeContent} />;
            case 'flowchart': return <FlowchartNote content={activeContent} />;
            case 'sentence': return <SentenceNote content={activeContent} />;
            case 'sketchnote': return <SketchNote content={activeContent} />;
            default: return <OutlineNote content={activeContent} />;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in flex flex-col">
            {/* Dashboard-style Top Bar */}
            <header className="sticky top-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 lg:px-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
                    >
                        <CaretLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors" onClick={onClose}>
                                <Layout className="w-3 h-3" /> Hub
                            </span>
                            <span className="opacity-50">/</span>
                            <span className="text-foreground font-bold">{topic.courseId.toUpperCase()}</span>
                        </div>
                        <h1 className="text-sm font-bold leading-tight truncate max-w-[200px] lg:max-w-md">
                            {topic.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* View Switcher Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 h-8 px-3">
                                <span className="text-lg">{currentMethodInfo?.icon}</span>
                                <span>{currentMethodInfo?.name}</span>
                                <CaretLeft className="w-3 h-3 rotate-270 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {noteMethods.map(m => (
                                <DropdownMenuItem
                                    key={m.id}
                                    onClick={() => setCurrentMethod(m.id)}
                                    className="gap-2"
                                >
                                    <span className="text-lg">{m.icon}</span>
                                    {m.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

                    <Button
                        variant={activeHighlight ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveHighlight(!activeHighlight)}
                        className="rounded-full"
                        title="Highlight Mode"
                    >
                        <Highlighter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ShareNetwork className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Note Content Container */}
            <main className="flex-1 relative overflow-y-auto custom-scrollbar bg-dot-pattern">
                {renderContent()}
            </main>
        </div>
    );
}
