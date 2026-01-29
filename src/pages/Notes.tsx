import { useState, useEffect } from "react";
import {
  Books,
  MagnifyingGlass,
  ArrowRight,
  Brain,
  Sparkle,
  CheckCircle,
  FileText,
  List,
  Graph,
  Table,
  Package,
  AlignLeft,
  Link,
  Lightbulb,
  Pen
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { noteMethods } from "@/data/mockData";
import { mockTopics, TopicMaster } from "@/data/mockTopics";
import NoteRoom from "./NoteRoom";
import { toast } from "sonner";

// High-Impact "Power" Visuals - LIGHTER & NO SHADOWS
const methodVisuals: Record<string, { gradient: string; pattern: string; icon: any }> = {
  'cornell': {
    gradient: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)',
    icon: FileText
  },
  'outline': {
    gradient: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    pattern: 'linear-gradient(135deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)',
    icon: List
  },
  'mindmap': {
    gradient: 'bg-gradient-to-br from-violet-400 to-purple-600',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
    icon: Brain
  },
  'charting': {
    gradient: 'bg-gradient-to-br from-orange-400 to-red-600',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px)',
    icon: Table
  },
  'boxing': {
    gradient: 'bg-gradient-to-br from-pink-400 to-rose-600',
    pattern: 'linear-gradient(30deg, rgba(255,255,255,0.2) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.2) 87.5%, rgba(255,255,255,0.2))',
    icon: Package
  },
  'zettelkasten': {
    gradient: 'bg-gradient-to-br from-slate-400 to-gray-600',
    pattern: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, transparent 60%)',
    icon: Link
  },
  'feynman': {
    gradient: 'bg-gradient-to-br from-yellow-400 to-amber-600',
    pattern: 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.3) 0deg, transparent 60deg)',
    icon: Lightbulb
  },
  'flowchart': {
    gradient: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    pattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 12px)',
    icon: Graph
  },
  'sentence': {
    gradient: 'bg-gradient-to-br from-rose-400 to-pink-600',
    pattern: 'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px) 0 0 / 24px 24px',
    icon: AlignLeft
  },
  'sketchnote': {
    gradient: 'bg-gradient-to-br from-indigo-400 to-purple-600',
    pattern: 'radial-gradient(rgba(255,255,255,0.5) 1.5px, transparent 0) 0 0 / 24px 24px',
    icon: Pen
  }
};

export default function Notes() {
  const [activeTopic, setActiveTopic] = useState<TopicMaster | null>(null);
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [isNoteRoomOpen, setIsNoteRoomOpen] = useState(false);

  // Selection state
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  const handleLaunch = () => {
    if (selectedTopicId && selectedMethodId) {
      setActiveTopic(mockTopics[selectedTopicId]);
      setActiveMethod(selectedMethodId);
      setIsNoteRoomOpen(true);
    } else {
      toast.error("Please select both a topic and a note method.");
    }
  };

  const handleCloseRoom = () => {
    setIsNoteRoomOpen(false);
  };

  if (isNoteRoomOpen && activeTopic && activeMethod) {
    return (
      <Layout showSidebar={false} title={`Notes: ${activeTopic.title}`}>
        <NoteRoom
          topic={activeTopic}
          initialMethod={activeMethod}
          onClose={handleCloseRoom}
        />
      </Layout>
    );
  }

  return (
    <DashboardLayout title="Notes Hub">
      <div className="container py-6 max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cognitive Studio</h1>
            <p className="text-muted-foreground mt-1">Select your topic and a structured note-taking method</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 gap-1.5 font-medium rounded-full">
              <Books className="w-3.5 h-3.5" />
              {Object.keys(mockTopics).length} Topics
            </Badge>
            <Badge variant="outline" className="px-3 py-1 gap-1.5 font-medium rounded-full">
              <Brain className="w-3.5 h-3.5" />
              10 Methods
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Col: Topic Selection */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" />
                  Select Topic
                </h2>
              </div>

              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  className="pl-10 h-9 rounded-lg border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.values(mockTopics).map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-all duration-200 border relative group",
                      selectedTopicId === topic.id
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-card border-transparent hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        selectedTopicId === topic.id ? "bg-primary" : "bg-muted-foreground/30"
                      )} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-0.5">{topic.courseId}</p>
                        <h3 className="font-bold text-sm leading-tight">{topic.title}</h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Method Selection */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-2">
                Choose Structure
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {noteMethods.map((method) => {
                  const visual = methodVisuals[method.id] || methodVisuals['outline'];
                  const IconComponent = visual.icon;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethodId(method.id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 group overflow-hidden border-2 text-center h-40",
                        selectedMethodId === method.id
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105"
                          : "border-transparent bg-muted/40 hover:bg-muted/60 opacity-80 hover:opacity-100"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                        selectedMethodId === method.id ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground"
                      )}>
                        <IconComponent className="w-6 h-6" weight={selectedMethodId === method.id ? "fill" : "regular"} />
                      </div>

                      <h4 className="font-bold text-base mb-1">{method.name}</h4>
                      <p className="text-[10px] text-muted-foreground px-2 leading-tight">
                        {method.description.split('.')[0]}.
                      </p>

                      {selectedMethodId === method.id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full shadow-lg">
                          <CheckCircle className="w-4 h-4" weight="fill" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selection Summary Action */}
            <div className="bg-card p-4 rounded-xl shadow-lg border flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Selected Configuration</p>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    {selectedTopicId ? mockTopics[selectedTopicId].title : "Select a topic"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold text-primary">
                    {selectedMethodId ? noteMethods.find(m => m.id === selectedMethodId)?.name : "Choose method"}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleLaunch}
                disabled={!selectedTopicId || !selectedMethodId}
                className="rounded-full px-10 h-12 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                Launch Studio
                <Sparkle className="ml-2 w-4 h-4" weight="fill" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
