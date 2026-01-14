import { useState, useEffect } from "react";
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
  RefreshCw,
  Send,
  Lightbulb,
  ArrowLeft,
  Mic,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  RotateCcw as Retry,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { courses } from "@/data/mockData";
import { ChapterContent } from "@/components/study/ChapterContent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudyMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
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
    bgColor: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    description: "Break study into timed intervals with short breaks. AI schedules content segments for maximum retention.",
    howItWorks: [
      "AI divides your material into 25-minute study chunks",
      "Timer visible with progress bar and key highlights",
      "Mini-quizzes at intervals to check understanding",
      "5-10 min breaks with stretch reminders",
      "After 4 cycles, longer break with material review"
    ],
    aiFeatures: ["Auto-chunking", "Key highlighting", "Interval quizzes", "Break optimization"],
    bestFor: ["Preventing burnout", "Long sessions", "Building focus"],
    duration: "25 min sessions"
  },
  {
    id: "feynman",
    name: "Feynman Learning",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    description: "Explain concepts in simple language, then test understanding with problems. Perfect for dense materials.",
    howItWorks: [
      "AI extracts key concepts from material",
      "Explain each concept as if teaching a friend",
      "AI analyzes gaps and missing keywords",
      "Follow-up questions test understanding",
      "Repeat until concept is fully understood"
    ],
    aiFeatures: ["Concept extraction", "Gap analysis", "Adaptive follow-ups", "Understanding verification"],
    bestFor: ["Deep understanding", "Difficult concepts", "Teaching-style learning"],
    duration: "15-30 min/concept"
  },
  {
    id: "interleaved",
    name: "Interleaved Study",
    icon: Shuffle,
    color: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    description: "Mix short bursts of multiple topics. Helps make connections across subjects.",
    howItWorks: [
      "AI breaks material into small topic modules",
      "Creates alternating study sequences",
      "Micro-assessment after each module",
      "Tracks topic fatigue dynamically",
      "Quick transitions keep engagement high"
    ],
    aiFeatures: ["Topic mixing", "Fatigue detection", "Dynamic sequencing", "Cross-connections"],
    bestFor: ["Making connections", "Avoiding boredom", "Multiple subjects"],
    duration: "5-15 min/topic"
  },
  {
    id: "progressive",
    name: "Progressive Summary",
    icon: Layers,
    color: "text-green-500",
    bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    description: "AI highlights key points progressively. Build deep, layered understanding.",
    howItWorks: [
      "AI scans and highlights key sentences",
      "Review and refine highlights in your words",
      "Multiple passes: broad → focused → condensed",
      "Each pass includes retention questions",
      "Material evolves to visual map"
    ],
    aiFeatures: ["Auto-highlighting", "Summary layering", "Visual evolution", "Retention checks"],
    bestFor: ["Textbook reading", "Literature review", "Research papers"],
    duration: "20-40 min"
  },
  {
    id: "leitner",
    name: "Leitner Flashcards",
    icon: Repeat,
    color: "text-orange-500",
    bgColor: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    description: "AI creates flashcards and prioritizes harder cards using spaced repetition.",
    howItWorks: [
      "AI converts material into flashcards",
      "Cards classified by difficulty",
      "Correct → advance box, wrong → first box",
      "Dynamic review frequency adjustment",
      "Focus on hardest cards first"
    ],
    aiFeatures: ["Auto flashcard creation", "Difficulty classification", "Spaced repetition", "Performance tracking"],
    bestFor: ["Memorization", "Vocabulary", "Facts and definitions"],
    duration: "15-30 min sessions"
  },
  {
    id: "problem-cycling",
    name: "Problem Cycling",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    description: "Cycle between solving, analyzing mistakes, and reattempting. Master problem-solving.",
    howItWorks: [
      "AI identifies problem areas from material",
      "Present problem → attempt → AI checks",
      "If incorrect, step-by-step breakdown",
      "Retry varied version of problem",
      "Repeat until mastery achieved"
    ],
    aiFeatures: ["Problem generation", "Step breakdown", "Variation creation", "Mastery tracking"],
    bestFor: ["Math", "Physics", "Programming"],
    duration: "30-60 min"
  },
  {
    id: "chunking",
    name: "Concept Chunking",
    icon: Box,
    color: "text-teal-500",
    bgColor: "bg-gradient-to-br from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    description: "Break material into 3-5 core concepts per chunk. Reduces cognitive overload.",
    howItWorks: [
      "AI breaks material into concept chunks",
      "Each chunk presented sequentially",
      "Micro-quiz after each chunk",
      "Next chunk unlocks after mastery",
      "Visual progress shows completion"
    ],
    aiFeatures: ["Smart chunking", "Sequential unlocking", "Mastery gating", "Progress tracking"],
    bestFor: ["Large chapters", "Complex topics", "Reducing overwhelm"],
    duration: "10-20 min/chunk"
  },
  {
    id: "reverse",
    name: "Reverse Learning",
    icon: RotateCcw,
    color: "text-pink-500",
    bgColor: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    description: "AI gives answers first - work backward to figure out the question. Enhances critical thinking.",
    howItWorks: [
      "AI extracts answers and conclusions",
      "Deduce the question or reasoning",
      "AI grades logic, not just final answer",
      "Switch between forward and reverse",
      "Strengthens understanding of 'why'"
    ],
    aiFeatures: ["Answer extraction", "Logic grading", "Hint system", "Bidirectional learning"],
    bestFor: ["Critical thinking", "Cause-effect", "Deep comprehension"],
    duration: "20-30 min"
  },
  {
    id: "question-first",
    name: "Question-First",
    icon: HelpCircle,
    color: "text-indigo-500",
    bgColor: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    description: "AI generates questions first. Search material to find answers. Active investigation.",
    howItWorks: [
      "AI generates smart questions from material",
      "Search material to find answers",
      "AI tracks time and difficulty",
      "Various question types",
      "Highlights shown after attempting"
    ],
    aiFeatures: ["Question generation", "Time tracking", "Difficulty scaling", "Active reading"],
    bestFor: ["Reading comprehension", "Active engagement", "Research skills"],
    duration: "25-40 min"
  },
  {
    id: "multisensory",
    name: "Multi-Sensory Study",
    icon: Headphones,
    color: "text-cyan-500",
    bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    description: "Alternate between reading, listening (TTS), and quizzing. Multiple senses for better retention.",
    howItWorks: [
      "AI schedules: reading, listening, quiz",
      "Spaced intervals: 1 day, 3 days, 1 week",
      "Adapts frequency for weak areas",
      "Engages visual, auditory, kinesthetic",
      "Track progress across all modes"
    ],
    aiFeatures: ["Multi-modal content", "Text-to-speech", "Spaced scheduling", "Adaptive frequency"],
    bestFor: ["Language learning", "Theory-heavy subjects", "Long-term retention"],
    duration: "15-30 min/mode"
  },
];

// Pomodoro Session Component with Full Content
function PomodoroSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [timer, setTimer] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [sessions, setSessions] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 0) {
          if (isBreak) {
            setIsBreak(false);
            return 25 * 60;
          } else {
            setSessions((s) => s + 1);
            setIsBreak(true);
            return sessions % 4 === 0 ? 15 * 60 : 5 * 60;
          }
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isBreak, sessions]);

  // Update reading progress based on timer
  useEffect(() => {
    if (!isBreak && !isPaused) {
      const totalTime = 25 * 60;
      const elapsed = totalTime - timer;
      const progress = Math.min((elapsed / totalTime) * 100, 100);
      setReadingProgress(Math.round(progress));
    }
  }, [timer, isBreak, isPaused]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = isBreak ? ((isBreak && sessions % 4 === 0 ? 15 * 60 : 5 * 60) - timer) / (sessions % 4 === 0 ? 15 * 60 : 5 * 60) * 100 : (25 * 60 - timer) / (25 * 60) * 100;

  return (
    <div className="space-y-6">
      {/* Timer Bar - Sticky */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pb-4 border-b border-border">
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <div className={cn("h-1.5", isBreak ? "bg-green-500" : "bg-red-500")} />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant={isBreak ? "default" : "destructive"}>
                  {isBreak ? (sessions % 4 === 0 ? "Long Break" : "Short Break") : `Session ${sessions}`}
                </Badge>
                <div className="text-3xl font-mono font-bold gradient-text">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-4 mr-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{sessions}</p>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{sessions * 25}</p>
                    <p className="text-xs text-muted-foreground">Minutes</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setTimer(0)}>
                  <SkipForward className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onEnd}>
                  End
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Full Chapter Content */}
      {!isBreak ? (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <ChapterContent 
            title="Database Normalization" 
            courseName={course?.name}
            readingProgress={readingProgress}
          />
        </ScrollArea>
      ) : (
        <Card className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Timer className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Break Time!</h2>
          <p className="text-muted-foreground mb-4">
            Take a moment to stretch, hydrate, and rest your eyes.
          </p>
          <p className="text-sm text-muted-foreground">
            {sessions % 4 === 0 ? "This is a long break - you've completed 4 sessions!" : "Short break - next session starts soon."}
          </p>
        </Card>
      )}
    </div>
  );
}

// Feynman Session Component with Full Content
function FeynmanSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [step, setStep] = useState<"read" | "explain" | "feedback">("read");
  const [explanation, setExplanation] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentConcept, setCurrentConcept] = useState(0);

  const concepts = [
    "First Normal Form (1NF)",
    "Second Normal Form (2NF)", 
    "Third Normal Form (3NF)",
    "Functional Dependencies",
    "Transitive Dependencies"
  ];

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pb-4 border-b border-border">
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <Badge variant="outline">Concept {currentConcept + 1} of {concepts.length}</Badge>
                <span className="font-semibold text-foreground">{concepts[currentConcept]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={step === "read" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStep("read")}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Read
                </Button>
                <Button
                  variant={step === "explain" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStep("explain")}
                >
                  <Brain className="w-4 h-4 mr-1" />
                  Explain
                </Button>
                <Button variant="ghost" size="sm" onClick={onEnd}>
                  End
                </Button>
              </div>
            </div>
            <Progress value={((currentConcept + 1) / concepts.length) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {step === "read" ? (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <ChapterContent 
            title="Database Normalization" 
            courseName={course?.name}
          />
        </ScrollArea>
      ) : (
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">Feynman Technique</Badge>
              <h2 className="text-2xl font-bold mb-2 text-foreground">Explain: {concepts[currentConcept]}</h2>
              <p className="text-muted-foreground">Explain this concept as if you're teaching it to a 10-year-old</p>
            </div>

            <div className={cn("p-6 rounded-2xl mb-6", method.bgColor)}>
              <div className="flex items-center gap-2 mb-4">
                <Brain className={cn("w-5 h-5", method.color)} />
                <span className="font-semibold text-foreground">Your Explanation</span>
              </div>
              <textarea
                className="w-full h-40 p-4 rounded-xl border bg-background text-foreground resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Think of a database like a big filing cabinet. Normalization is like organizing those files so you don't have copies everywhere..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>

            {showFeedback && (
              <div className="p-6 rounded-2xl bg-success/10 border border-success/20 mb-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="font-semibold text-success">AI Feedback</span>
                </div>
                <p className="text-sm mb-3 text-foreground">Great analogy! You correctly identified the core purpose. However, you missed these key points:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2" />
                    <span className="text-foreground">Mention the specific normal form characteristics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2" />
                    <span className="text-foreground">Explain how it prevents data anomalies</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                className="flex-1 gradient-primary" 
                onClick={() => setShowFeedback(true)}
                disabled={explanation.length < 20}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Explanation
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentConcept((c) => (c + 1) % concepts.length);
                  setExplanation("");
                  setShowFeedback(false);
                }}
              >
                Next Concept
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Leitner Flashcard Session Component
function LeitnerSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  const cards = [
    { front: "What is 1NF (First Normal Form)?", back: "Each cell contains a single value (no lists or arrays). Each row is unique. No repeating groups.", box: 1 },
    { front: "What is 2NF (Second Normal Form)?", back: "Must be in 1NF + all non-key columns depend on the ENTIRE primary key. Eliminates partial dependencies.", box: 2 },
    { front: "What is 3NF (Third Normal Form)?", back: "Must be in 2NF + no transitive dependencies (non-key columns shouldn't depend on other non-key columns).", box: 1 },
    { front: "What is a functional dependency?", back: "A constraint where one attribute uniquely determines another. Written as X → Y, meaning if two rows have the same X value, they must have the same Y value.", box: 3 },
    { front: "What is a transitive dependency?", back: "When a non-key attribute depends on another non-key attribute. Example: StudentID → Major → Department creates a transitive chain.", box: 2 },
    { front: "What is denormalization?", back: "The process of adding redundancy to improve read performance, sacrificing some normalization benefits.", box: 3 },
    { front: "What is BCNF?", back: "Boyce-Codd Normal Form: Every determinant must be a candidate key. Stricter than 3NF.", box: 1 },
    { front: "What are the three types of anomalies?", back: "Update anomalies (data inconsistency), Insertion anomalies (can't add data without related data), Deletion anomalies (losing data when deleting other data).", box: 2 },
  ];

  const card = cards[currentCard];

  const handleAnswer = (correct: boolean) => {
    setStats((s) => correct ? { ...s, correct: s.correct + 1 } : { ...s, incorrect: s.incorrect + 1 });
    setShowAnswer(false);
    setCurrentCard((c) => (c + 1) % cards.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">Card {currentCard + 1} of {cards.length}</Badge>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-success">
            <ThumbsUp className="w-4 h-4" />
            <span className="font-semibold">{stats.correct}</span>
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <ThumbsDown className="w-4 h-4" />
            <span className="font-semibold">{stats.incorrect}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onEnd}>End Session</Button>
        </div>
      </div>

      {/* Flashcard */}
      <Card className={cn("border-2 overflow-hidden min-h-[400px]", method.borderColor)}>
        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[360px]">
          <Badge variant="secondary" className="mb-6">Box {card.box}</Badge>
          
          {!showAnswer ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8 text-foreground">{card.front}</h2>
              <Button size="lg" onClick={() => setShowAnswer(true)}>
                <Eye className="w-5 h-5 mr-2" />
                Show Answer
              </Button>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <p className="text-lg text-muted-foreground mb-8">{card.back}</p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => handleAnswer(false)}
                >
                  <ThumbsDown className="w-5 h-5 mr-2" />
                  Didn't Know
                </Button>
                <Button 
                  size="lg" 
                  className="bg-success hover:bg-success/90"
                  onClick={() => handleAnswer(true)}
                >
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  Got It!
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Box Progress */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-foreground">Leitner Box Progress</h3>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((box) => (
              <div key={box} className={cn(
                "p-4 rounded-xl text-center border-2",
                box <= 2 ? "border-destructive/30 bg-destructive/5" : 
                box === 3 ? "border-warning/30 bg-warning/5" : 
                "border-success/30 bg-success/5"
              )}>
                <p className="text-2xl font-bold text-foreground">{cards.filter(c => c.box === box).length}</p>
                <p className="text-xs text-muted-foreground">Box {box}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Multi-Sensory Session Component
function MultiSensorySession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [mode, setMode] = useState<"read" | "listen" | "quiz">("read");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3">
            {[
              { id: "read", icon: BookOpen, label: "Read", color: "from-blue-500 to-cyan-500" },
              { id: "listen", icon: Headphones, label: "Listen", color: "from-purple-500 to-pink-500" },
              { id: "quiz", icon: HelpCircle, label: "Quiz", color: "from-green-500 to-emerald-500" },
            ].map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "outline"}
                className={cn(mode === m.id && `bg-gradient-to-br ${m.color}`)}
                onClick={() => setMode(m.id as any)}
              >
                <m.icon className="w-4 h-4 mr-2" />
                {m.label}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onEnd}>End Session</Button>
        </div>
      </div>

      {mode === "read" && (
        <ScrollArea className="h-[calc(100vh-220px)]">
          <ChapterContent 
            title="Database Normalization" 
            courseName={course?.name}
          />
        </ScrollArea>
      )}

      {mode === "listen" && (
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
          <CardContent className="p-8">
            <div className="text-center py-8">
              <div className={cn("w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center", method.bgColor)}>
                <Headphones className={cn("w-16 h-16", method.color)} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Audio Mode</h3>
              <p className="text-muted-foreground mb-8">Listen to AI-generated audio of the full chapter content</p>
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="lg">
                  <Volume2 className="w-5 h-5 mr-2" />
                  Speed: 1x
                </Button>
              </div>
              {isPlaying && (
                <div className="mt-8">
                  <Progress value={35} className="h-2 max-w-md mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">15:42 / 45:00</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "quiz" && (
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
          <CardContent className="p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Comprehension Quiz</h3>
              <div className="p-6 rounded-xl bg-muted/50">
                <p className="font-medium mb-4 text-foreground">Based on the chapter content, which of the following correctly describes Second Normal Form (2NF)?</p>
                <div className="space-y-3">
                  {[
                    "A table where each cell contains only atomic values",
                    "A table in 1NF where all non-key attributes fully depend on the entire primary key",
                    "A table where no non-key attribute depends on another non-key attribute",
                    "A table where every determinant is a candidate key"
                  ].map((option, i) => (
                    <Button key={i} variant="outline" className="w-full justify-start text-left h-auto py-3">
                      <span className="w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-sm flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-foreground">{option}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Generic Session Component for other methods - with full content
function GenericSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.5, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pb-4 border-b border-border">
        <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
          <div className={cn("h-1.5 bg-gradient-to-r", 
            method.id === "interleaved" ? "from-blue-500 to-cyan-500" : 
            method.id === "progressive" ? "from-green-500 to-emerald-500" :
            method.id === "problem-cycling" ? "from-yellow-500 to-amber-500" :
            method.id === "chunking" ? "from-teal-500 to-cyan-500" :
            method.id === "reverse" ? "from-pink-500 to-rose-500" :
            "from-indigo-500 to-purple-500")} />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", method.bgColor)}>
                  <method.icon className={cn("w-5 h-5", method.color)} />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">{method.name}</h2>
                  <p className="text-sm text-muted-foreground">{course?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{Math.round(progress)}% Complete</Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowContent(!showContent)}
                >
                  {showContent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={onEnd}>End</Button>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Full Content */}
      {showContent && (
        <ScrollArea className="h-[calc(100vh-280px)]">
          <ChapterContent 
            title="Database Normalization" 
            courseName={course?.name}
            readingProgress={Math.round(progress)}
          />
        </ScrollArea>
      )}

      {/* Method-specific interaction panel */}
      {!showContent && (
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <Badge variant="secondary" className="mb-4">Active Exercise</Badge>
            
            {method.id === "reverse" && (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <p className="font-semibold mb-2 text-foreground">Answer: "Third Normal Form eliminates transitive dependencies"</p>
                <p className="text-sm text-muted-foreground mb-3">What question would lead to this answer?</p>
                <textarea className="w-full p-3 rounded-lg border bg-background text-foreground" placeholder="Type your question..." />
              </div>
            )}

            {method.id === "question-first" && (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="font-semibold mb-2 text-foreground">Question: What are the key differences between 2NF and 3NF?</p>
                <p className="text-sm text-muted-foreground mb-3">Find the answer in the chapter material</p>
                <textarea className="w-full p-3 rounded-lg border bg-background text-foreground" placeholder="Type your answer..." />
              </div>
            )}

            {method.id === "problem-cycling" && (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="font-semibold mb-2 text-foreground">Problem:</p>
                <p className="text-sm text-muted-foreground mb-3">Given a table with columns (OrderID, ProductName, ProductPrice, CustomerName, CustomerAddress), normalize it to 3NF. Show your decomposed tables.</p>
                <textarea className="w-full p-3 rounded-lg border bg-background text-foreground h-32" placeholder="Describe your normalized tables..." />
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowContent(true)}>
                <BookOpen className="w-4 h-4 mr-2" />
                View Material
              </Button>
              <Button className="flex-1 gradient-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Help
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function StudyRoom() {
  const [selectedMethod, setSelectedMethod] = useState<StudyMethod | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [isStudying, setIsStudying] = useState(false);

  const course = courses.find((c) => c.id === selectedCourse);

  const startStudySession = () => {
    setIsStudying(true);
  };

  const endSession = () => {
    setIsStudying(false);
    setSelectedMethod(null);
    setSelectedCourse("");
    setSelectedUnits([]);
  };

  // Render active study session with method-specific UI
  if (isStudying && selectedMethod) {
    const SessionComponent = 
      selectedMethod.id === "pomodoro" ? PomodoroSession :
      selectedMethod.id === "feynman" ? FeynmanSession :
      selectedMethod.id === "leitner" ? LeitnerSession :
      selectedMethod.id === "multisensory" ? MultiSensorySession :
      GenericSession;

    return (
      <DashboardLayout title={selectedMethod.name}>
        <SessionComponent method={selectedMethod} course={course} onEnd={endSession} />
      </DashboardLayout>
    );
  }

  // Method detail view
  if (selectedMethod) {
    return (
      <DashboardLayout title={selectedMethod.name}>
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedMethod(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to methods
          </Button>

          <Card className={cn("border-2 overflow-hidden mb-6", selectedMethod.borderColor)}>
            <div className={cn("h-2 bg-gradient-to-r", 
              selectedMethod.id === "pomodoro" ? "from-red-500 to-orange-500" :
              selectedMethod.id === "feynman" ? "from-purple-500 to-pink-500" :
              selectedMethod.id === "interleaved" ? "from-blue-500 to-cyan-500" :
              selectedMethod.id === "progressive" ? "from-green-500 to-emerald-500" :
              selectedMethod.id === "leitner" ? "from-orange-500 to-amber-500" :
              selectedMethod.id === "problem-cycling" ? "from-yellow-500 to-amber-500" :
              selectedMethod.id === "chunking" ? "from-teal-500 to-cyan-500" :
              selectedMethod.id === "reverse" ? "from-pink-500 to-rose-500" :
              selectedMethod.id === "question-first" ? "from-indigo-500 to-purple-500" :
              "from-cyan-500 to-blue-500"
            )} />
            <CardContent className="p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0", selectedMethod.bgColor)}>
                  <selectedMethod.icon className={cn("w-10 h-10", selectedMethod.color)} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2 text-foreground">{selectedMethod.name}</h1>
                  <p className="text-muted-foreground mb-4">{selectedMethod.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{selectedMethod.duration}</Badge>
                    {selectedMethod.bestFor.map((item) => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-foreground">How It Works</h3>
                  <div className="space-y-3">
                    {selectedMethod.howItWorks.map((step, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-xl bg-muted/50">
                        <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                          {i + 1}
                        </div>
                        <p className="text-sm pt-0.5 text-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMethod.aiFeatures.map((feature) => (
                      <div key={feature} className={cn("p-3 rounded-xl border text-center", selectedMethod.borderColor, selectedMethod.bgColor)}>
                        <p className="text-sm font-medium text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Select Material */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-foreground">Select Your Material</CardTitle>
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
                    <span className="font-medium text-sm text-foreground">{c.name}</span>
                  </button>
                ))}
              </div>

              {course && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-medium text-foreground">Select Units</h4>
                  {course.units.map((unit) => (
                    <label
                      key={unit.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                        selectedUnits.includes(unit.id) ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <Checkbox
                        checked={selectedUnits.includes(unit.id)}
                        onCheckedChange={(checked) => {
                          setSelectedUnits((prev) =>
                            checked ? [...prev, unit.id] : prev.filter((id) => id !== unit.id)
                          );
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{unit.title}</p>
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

  // Method selection grid
  return (
    <DashboardLayout title="Study Room">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-foreground">Choose Your Study Method</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each method includes full chapter content (10+ pages). AI-powered interfaces adapt to your learning style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {studyMethods.map((method) => (
            <Card 
              key={method.id} 
              className={cn(
                "cursor-pointer hover-lift transition-all border-2 overflow-hidden group",
                "hover:border-primary/50",
                method.borderColor
              )}
              onClick={() => setSelectedMethod(method)}
            >
              <div className={cn("h-1.5 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
                method.id === "pomodoro" ? "from-red-500 to-orange-500" :
                method.id === "feynman" ? "from-purple-500 to-pink-500" :
                method.id === "interleaved" ? "from-blue-500 to-cyan-500" :
                method.id === "progressive" ? "from-green-500 to-emerald-500" :
                method.id === "leitner" ? "from-orange-500 to-amber-500" :
                method.id === "problem-cycling" ? "from-yellow-500 to-amber-500" :
                method.id === "chunking" ? "from-teal-500 to-cyan-500" :
                method.id === "reverse" ? "from-pink-500 to-rose-500" :
                method.id === "question-first" ? "from-indigo-500 to-purple-500" :
                "from-cyan-500 to-blue-500"
              )} />
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", method.bgColor)}>
                    <method.icon className={cn("w-6 h-6", method.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate text-foreground">{method.name}</h3>
                    <Badge variant="outline" className="text-xs">{method.duration}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
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
