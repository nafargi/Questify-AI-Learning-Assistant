import { useState, useEffect } from "react";
import {
  Library,
  Search,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  FileText,
  List,
  Workflow,
  Table2,
  Box,
  AlignLeft,
  Link2,
  Lightbulb,
  PenTool
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
    icon: BrainCircuit
  },
  'charting': {
    gradient: 'bg-gradient-to-br from-orange-400 to-red-600',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px)',
    icon: Table2
  },
  'boxing': {
    gradient: 'bg-gradient-to-br from-pink-400 to-rose-600',
    pattern: 'linear-gradient(30deg, rgba(255,255,255,0.2) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.2) 87.5%, rgba(255,255,255,0.2))',
    icon: Box
  },
  'zettelkasten': {
    gradient: 'bg-gradient-to-br from-slate-400 to-gray-600',
    pattern: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, transparent 60%)',
    icon: Link2
  },
  'feynman': {
    gradient: 'bg-gradient-to-br from-yellow-400 to-amber-600',
    pattern: 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.3) 0deg, transparent 60deg)',
    icon: Lightbulb
  },
  'flowchart': {
    gradient: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    pattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 12px)',
    icon: Workflow
  },
  'sentence': {
    gradient: 'bg-gradient-to-br from-rose-400 to-pink-600',
    pattern: 'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px) 0 0 / 24px 24px',
    icon: AlignLeft
  },
  'sketchnote': {
    gradient: 'bg-gradient-to-br from-indigo-400 to-purple-600',
    pattern: 'radial-gradient(rgba(255,255,255,0.5) 1.5px, transparent 0) 0 0 / 24px 24px',
    icon: PenTool
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
      <NoteRoom
        topic={activeTopic}
        initialMethod={activeMethod}
        onClose={handleCloseRoom}
      />
    );
  }

  return (
    <DashboardLayout title="Knowledge Hub">
      <div className="max-w-[1700px] mx-auto p-4 lg:p-8 animate-fade-in space-y-8 bg-dot-pattern">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-border/50 pb-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
              Cognitive <span className="text-primary transparent-text-gradient">Studio</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl font-medium">
              Select your material. Choose your lens. Synthesize mastery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-background border px-4 py-2 rounded-xl text-xs font-bold text-foreground/80 uppercase tracking-widest flex items-center gap-2">
              <Library className="w-4 h-4 text-primary" /> {Object.keys(mockTopics).length} Topics
            </div>
            <div className="bg-background border px-4 py-2 rounded-xl text-xs font-bold text-foreground/80 uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary" /> 10 Methods
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">

          {/* Left Col: Topic Selection (3 cols) */}
          <Card className="lg:col-span-3 border-none shadow-none bg-transparent flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2 text-xl tracking-tight">
                Source Material
              </h2>
            </div>

            <div className="space-y-3">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Filter topics..." className="pl-10 h-10 rounded-xl bg-card border shadow-sm focus:ring-2 focus:ring-primary/20" />
              </div>

              <div className="space-y-2 pr-2 custom-scrollbar overflow-y-auto max-h-[600px]">
                {Object.values(mockTopics).map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden",
                      selectedTopicId === topic.id
                        ? "border-primary bg-background translate-x-1"
                        : "border-transparent bg-card/60 hover:bg-card"
                    )}
                  >
                    {selectedTopicId === topic.id && (
                      <div className="absolute right-3 top-3 text-primary animate-in zoom-in spin-in-90 duration-300">
                        <CheckCircle2 className="w-5 h-5 fill-primary/10" />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold opacity-70 bg-background/50 backdrop-blur-sm">
                        {topic.courseId}
                      </Badge>
                    </div>
                    <h3 className={cn(
                      "font-bold leading-tight mb-1 relative z-10 transition-colors pr-6",
                      selectedTopicId === topic.id ? "text-primary" : "text-foreground"
                    )}>
                      {topic.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Right Col: Method Selection (9 cols) */}
          <Card className="lg:col-span-9 border-none shadow-none bg-transparent flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2 text-xl tracking-tight">
                Cognitive Method
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {noteMethods.map((method) => {
                const visual = methodVisuals[method.id] || methodVisuals['outline'];
                const IconComponent = visual.icon;

                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethodId(method.id)}
                    className={cn(
                      "relative flex flex-col items-center justify-between p-6 rounded-2xl transition-all duration-300 group overflow-hidden h-[200px] border-0 ring-1 ring-inset ring-white/10",
                      selectedMethodId === method.id
                        ? "scale-[1.03] ring-2 ring-white z-10"
                        : "hover:scale-[1.02] opacity-90 hover:opacity-100"
                    )}
                  >
                    {/* Active Gradient Background */}
                    <div
                      className={cn("absolute inset-0 transition-opacity duration-500", visual.gradient)}
                    />

                    {/* Pattern Overlay */}
                    <div
                      className="absolute inset-0 opacity-30 bg-repeat mix-blend-overlay"
                      style={{ backgroundImage: visual.pattern, backgroundSize: '100% 100%' }}
                    />

                    {/* Inner Shadow/Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 pointer-events-none" />

                    {/* Icon - Large & White */}
                    <div className="relative z-10 mt-4 transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="text-white drop-shadow-md p-2">
                        <IconComponent className="w-12 h-12 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Text Content - White */}
                    <div className="relative z-10 text-center space-y-1 w-full mb-2">
                      <div className="font-black text-white text-base tracking-wide drop-shadow-md uppercase">
                        {method.name}
                      </div>
                    </div>

                    {/* Selection Check */}
                    {selectedMethodId === method.id && (
                      <div className="absolute top-3 right-3 bg-white text-black rounded-full p-1 animate-in zoom-in">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-8 flex justify-end gap-6 items-center bg-card p-4 rounded-2xl border border-border/50 relative overflow-hidden">

              <div className="relative z-10 text-right hidden sm:block mr-4">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Session Configuration</div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Badge variant="outline" className="bg-background">
                    {selectedTopicId ? mockTopics[selectedTopicId].title : "Select Topic..."}
                  </Badge>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <Badge variant={selectedMethodId ? "default" : "outline"} className={selectedMethodId ? "bg-primary text-primary-foreground" : "bg-background"}>
                    {selectedMethodId ? noteMethods.find(m => m.id === selectedMethodId)?.name : "Select Method..."}
                  </Badge>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleLaunch}
                disabled={!selectedTopicId || !selectedMethodId}
                className={cn(
                  "relative z-10 h-14 px-12 rounded-xl font-bold text-lg gap-3 transition-all duration-300 shadow-none border",
                  selectedTopicId && selectedMethodId ? "bg-primary hover:bg-primary/90 hover:scale-[1.02] ring-2 ring-primary/20 ring-offset-2 ring-offset-background" : "bg-muted text-muted-foreground"
                )}
              >
                <Sparkles className="w-5 h-5 fill-current" />
                Launch Studio
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}
