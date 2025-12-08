import { useState } from "react";
import {
  Timer,
  Brain,
  Shuffle,
  Layers,
  Repeat,
  Zap,
  Box,
  RotateCcw,
  HelpCircle,
  Headphones,
  Play,
  Pause,
  SkipForward,
  ChevronRight,
  BookOpen,
  Target,
  CheckCircle2,
  Clock,
  Volume2,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { courses } from "@/data/mockData";

interface StudyMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  howItWorks: string[];
  aiFeatures: string[];
  bestFor: string[];
  duration: string;
}

const studyMethods: StudyMethod[] = [
  {
    id: "pomodoro",
    name: "Pomodoro Technique",
    icon: Timer,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Break study into timed intervals (25–50 min) with short breaks. AI schedules content segments based on time blocks for maximum retention.",
    howItWorks: [
      "AI divides your uploaded material into 25–50 minute 'study chunks' automatically",
      "Each session shows a timer with progress bar and highlights key points",
      "During sessions, you can annotate and take mini-quizzes at intervals",
      "After each session, AI suggests a 5–10 min break with stretch reminders",
      "After 4 cycles, longer break with review of all material covered"
    ],
    aiFeatures: ["Auto-chunking material", "Key point highlighting", "Interval mini-quizzes", "Break optimization"],
    bestFor: ["Preventing burnout", "Long study sessions", "Building focus habits"],
    duration: "25-50 min sessions"
  },
  {
    id: "feynman",
    name: "Feynman Learning Loops",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "AI prompts you to explain each concept in simple language, then immediately tests understanding with a related problem. Perfect for dense materials.",
    howItWorks: [
      "AI extracts key concepts from your material automatically",
      "You're prompted to explain each concept as if teaching a friend",
      "AI analyzes your explanation for gaps and missing keywords",
      "Follow-up questions and problems test your understanding",
      "Repeat until concept is fully understood before moving on"
    ],
    aiFeatures: ["Concept extraction", "Gap analysis", "Adaptive follow-ups", "Understanding verification"],
    bestFor: ["Deep understanding", "Difficult concepts", "Teaching-style learning"],
    duration: "15-30 min per concept"
  },
  {
    id: "interleaved",
    name: "Interleaved Micro-Study",
    icon: Shuffle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Instead of long sessions on one topic, AI mixes short bursts of multiple topics. Helps students make connections across subjects.",
    howItWorks: [
      "AI breaks your material into small topic modules (5–15 min each)",
      "Creates a study sequence alternating between different topics",
      "Each module ends with a micro-assessment to check retention",
      "AI tracks topic fatigue and dynamically adjusts the order",
      "Quick transitions keep engagement high throughout"
    ],
    aiFeatures: ["Topic mixing", "Fatigue detection", "Dynamic sequencing", "Cross-subject connections"],
    bestFor: ["Making connections", "Avoiding boredom", "Multiple subjects"],
    duration: "5-15 min per topic"
  },
  {
    id: "progressive",
    name: "Progressive Summarization",
    icon: Layers,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "AI highlights key points progressively: first bold the main ideas, then summarize focusing on connections. Build deep, layered understanding.",
    howItWorks: [
      "AI scans your material and highlights key sentences automatically",
      "You review highlights and refine them in your own words",
      "Multiple summarization passes: broad → focused → ultra-condensed",
      "Each pass includes questions to check retention",
      "Material evolves visually from text → highlights → summary → visual map"
    ],
    aiFeatures: ["Auto-highlighting", "Summary layering", "Visual evolution", "Retention checks"],
    bestFor: ["Textbook reading", "Literature review", "Research papers"],
    duration: "20-40 min"
  },
  {
    id: "leitner",
    name: "Leitner Adaptive Recall",
    icon: Repeat,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "AI automatically creates flashcards from your material, then prioritizes harder cards using spaced repetition for optimal memory retention.",
    howItWorks: [
      "AI converts your uploaded material into flashcards automatically",
      "Cards classified by difficulty using keywords and concept density",
      "Leitner system: correct → advance box, wrong → return to first box",
      "Performance tracked with dynamic review frequency adjustment",
      "Focus on hardest cards first for efficient learning"
    ],
    aiFeatures: ["Auto flashcard creation", "Difficulty classification", "Spaced repetition", "Performance tracking"],
    bestFor: ["Memorization", "Vocabulary", "Facts and definitions"],
    duration: "15-30 min sessions"
  },
  {
    id: "problem-cycling",
    name: "Active Problem Cycling",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "For problem-heavy subjects, AI cycles between solving, analyzing mistakes, and reattempting. Encourages mastery over passive review.",
    howItWorks: [
      "AI identifies problem areas from your material",
      "Present a problem → you attempt → AI checks correctness",
      "If incorrect, AI breaks down solution step by step",
      "You retry a slightly varied version of the problem",
      "Repeat cycle until mastery is achieved"
    ],
    aiFeatures: ["Problem generation", "Step-by-step breakdown", "Variation creation", "Mastery tracking"],
    bestFor: ["Math", "Physics", "Programming", "Problem-solving subjects"],
    duration: "30-60 min"
  },
  {
    id: "chunking",
    name: "Concept Chunking",
    icon: Box,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    description: "AI breaks large material into 'chunks' of 3–5 core concepts, then guides you through one chunk at a time. Reduces cognitive overload.",
    howItWorks: [
      "AI breaks your material into chunks of 3–5 core concepts",
      "Each chunk presented sequentially, one at a time",
      "After each chunk, micro-quiz or reflection questions",
      "Next chunk unlocks only after mastering previous one",
      "Visual progress bar shows completion of all chunks"
    ],
    aiFeatures: ["Smart chunking", "Sequential unlocking", "Mastery gating", "Progress tracking"],
    bestFor: ["Large chapters", "Complex topics", "Reducing overwhelm"],
    duration: "10-20 min per chunk"
  },
  {
    id: "reverse",
    name: "Reverse Learning",
    icon: RotateCcw,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "AI gives answers first, and you must work backward to figure out the question or reasoning. Enhances critical thinking and cause-effect understanding.",
    howItWorks: [
      "AI extracts answers, definitions, or conclusions from material",
      "You deduce the question or reasoning behind the answer",
      "AI provides hints and grades your logic, not just final answer",
      "Option to switch between forward and reverse learning",
      "Strengthens reasoning and understanding of 'why'"
    ],
    aiFeatures: ["Answer extraction", "Logic grading", "Hint system", "Bidirectional learning"],
    bestFor: ["Critical thinking", "Cause-effect relationships", "Deep comprehension"],
    duration: "20-30 min"
  },
  {
    id: "question-first",
    name: "Question-First Learning",
    icon: HelpCircle,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    description: "AI generates smart questions from your material, then you seek answers inside the material. Turns passive reading into active investigation.",
    howItWorks: [
      "AI generates smart questions automatically from your material",
      "You search the material to find and formulate answers",
      "AI tracks time spent per question and difficulty levels",
      "Question types vary: multiple-choice, short answer, problem-solving",
      "Highlights shown only after you attempt the answer first"
    ],
    aiFeatures: ["Question generation", "Time tracking", "Difficulty scaling", "Active reading"],
    bestFor: ["Reading comprehension", "Active engagement", "Research skills"],
    duration: "25-40 min"
  },
  {
    id: "multisensory",
    name: "Spaced Multi-Sensory Study",
    icon: Headphones,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    description: "AI schedules review sessions alternating between reading, listening (TTS), and self-quizzing. Uses multiple senses for better retention.",
    howItWorks: [
      "AI schedules multiple review modes: reading, listening (TTS), self-quiz",
      "Spaced intervals: immediate, 1 day, 3 days, 1 week",
      "Adaptively increases frequency for weak areas",
      "Engages visual, auditory, and kinesthetic learning styles",
      "Track progress across all sensory modes"
    ],
    aiFeatures: ["Multi-modal content", "Text-to-speech", "Spaced scheduling", "Adaptive frequency"],
    bestFor: ["Language learning", "Theory-heavy subjects", "Long-term retention"],
    duration: "15-30 min per mode"
  },
];

export default function StudyRoom() {
  const [selectedMethod, setSelectedMethod] = useState<StudyMethod | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [isStudying, setIsStudying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);

  const course = courses.find((c) => c.id === selectedCourse);

  const startStudySession = () => {
    setIsStudying(true);
    setProgress(0);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
  };

  if (isStudying && selectedMethod) {
    return (
      <DashboardLayout title={selectedMethod.name}>
        <div className="max-w-4xl mx-auto">
          {/* Study Session Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selectedMethod.bgColor)}>
                    <selectedMethod.icon className={cn("w-6 h-6", selectedMethod.color)} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{selectedMethod.name}</h2>
                    <p className="text-sm text-muted-foreground">{course?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                    </div>
                    <p className="text-xs text-muted-foreground">Time remaining</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsPaused(!isPaused)}>
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Session Progress: {progress}%
              </p>
            </CardContent>
          </Card>

          {/* Study Content */}
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">Current Concept</Badge>
                <h2 className="text-2xl font-bold mb-4">Database Normalization</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. 
                  It involves dividing large tables into smaller tables and defining relationships between them.
                </p>
              </div>

              {/* Method-specific content */}
              {selectedMethod.id === "feynman" && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      Explain this concept in your own words
                    </h3>
                    <textarea 
                      className="w-full h-32 p-4 rounded-xl border bg-background resize-none"
                      placeholder="Explain database normalization as if you're teaching it to a 10-year-old..."
                    />
                  </div>
                  <Button className="w-full gradient-primary">
                    Submit Explanation
                  </Button>
                </div>
              )}

              {selectedMethod.id === "pomodoro" && (
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-success/20 bg-success/5">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                      <p className="font-bold text-2xl">2</p>
                      <p className="text-xs text-muted-foreground">Completed Sessions</p>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-bold text-2xl">50 min</p>
                      <p className="text-xs text-muted-foreground">Total Focus Time</p>
                    </CardContent>
                  </Card>
                  <Card className="border-warning/20 bg-warning/5">
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-warning mx-auto mb-2" />
                      <p className="font-bold text-2xl">4</p>
                      <p className="text-xs text-muted-foreground">Sessions Today</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {selectedMethod.id === "multisensory" && (
                <div className="space-y-4">
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" className="flex-1 max-w-[200px] h-24 flex-col">
                      <BookOpen className="w-6 h-6 mb-2" />
                      Read
                    </Button>
                    <Button className="flex-1 max-w-[200px] h-24 flex-col gradient-primary">
                      <Volume2 className="w-6 h-6 mb-2" />
                      Listen
                    </Button>
                    <Button variant="outline" className="flex-1 max-w-[200px] h-24 flex-col">
                      <HelpCircle className="w-6 h-6 mb-2" />
                      Quiz
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setIsStudying(false)}>
              End Session
            </Button>
            <Button className="gradient-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Help
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (selectedMethod) {
    return (
      <DashboardLayout title={selectedMethod.name}>
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedMethod(null)}>
            ← Back to methods
          </Button>

          {/* Method Details */}
          <Card className="mb-6 overflow-hidden">
            <div className={cn("h-2", selectedMethod.bgColor.replace("/10", ""))} />
            <CardContent className="p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0", selectedMethod.bgColor)}>
                  <selectedMethod.icon className={cn("w-10 h-10", selectedMethod.color)} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedMethod.name}</h1>
                  <p className="text-muted-foreground mb-4">{selectedMethod.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{selectedMethod.duration}</Badge>
                    {selectedMethod.bestFor.map((item) => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">How It Works</h3>
                <div className="space-y-3">
                  {selectedMethod.howItWorks.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <p className="text-sm pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI-Powered Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedMethod.aiFeatures.map((feature) => (
                    <div key={feature} className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
                      <p className="text-sm font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Select Material */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Your Material</CardTitle>
              <CardDescription>Choose which course and units to study</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {courses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCourse(c.id); setSelectedUnits([]); }}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                      selectedCourse === c.id ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <span className="text-2xl block mb-2">{c.icon}</span>
                    <span className="font-medium text-sm">{c.name}</span>
                  </button>
                ))}
              </div>

              {course && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-medium">Select Units</h4>
                  {course.units.map((unit) => (
                    <label
                      key={unit.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                        selectedUnits.includes(unit.id) ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUnits.includes(unit.id)}
                        onChange={(e) => {
                          setSelectedUnits((prev) =>
                            e.target.checked ? [...prev, unit.id] : prev.filter((id) => id !== unit.id)
                          );
                        }}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                        selectedUnits.includes(unit.id) ? "bg-primary border-primary" : "border-muted-foreground"
                      )}>
                        {selectedUnits.includes(unit.id) && (
                          <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{unit.title}</p>
                        <p className="text-xs text-muted-foreground">{unit.description}</p>
                      </div>
                      <Badge variant="secondary">{unit.mastery}% mastery</Badge>
                    </label>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Button 
            className="w-full gradient-primary" 
            size="lg"
            disabled={!selectedCourse || selectedUnits.length === 0}
            onClick={startStudySession}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Study Session
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Study Room">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Study Method</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select an AI-powered study technique that matches your learning goals. 
            Each method is designed to maximize your understanding and retention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyMethods.map((method) => (
            <Card 
              key={method.id} 
              className="cursor-pointer hover-lift hover:border-primary/50 transition-all"
              onClick={() => setSelectedMethod(method)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", method.bgColor)}>
                    <method.icon className={cn("w-6 h-6", method.color)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{method.name}</h3>
                    <Badge variant="outline" className="text-xs">{method.duration}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {method.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {method.bestFor.slice(0, 2).map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
