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

// Pomodoro Session Component
function PomodoroSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [timer, setTimer] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [sessions, setSessions] = useState(1);
  const [isBreak, setIsBreak] = useState(false);

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

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = isBreak ? ((isBreak && sessions % 4 === 0 ? 15 * 60 : 5 * 60) - timer) / (sessions % 4 === 0 ? 15 * 60 : 5 * 60) * 100 : (25 * 60 - timer) / (25 * 60) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timer Card */}
      <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
        <div className={cn("h-2", isBreak ? "bg-green-500" : "bg-red-500")} />
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Badge variant={isBreak ? "default" : "destructive"} className="mb-4">
              {isBreak ? (sessions % 4 === 0 ? "Long Break" : "Short Break") : `Session ${sessions}`}
            </Badge>
            <div className="text-8xl font-mono font-bold mb-4 gradient-text">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <Progress value={progress} className="h-3 max-w-md mx-auto" />
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="lg" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="outline" size="lg" onClick={() => setTimer(0)}>
              <SkipForward className="w-5 h-5 mr-2" />
              Skip
            </Button>
          </div>

          {/* Session stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-red-500/10 text-center">
              <Timer className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{sessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 text-center">
              <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{sessions * 25}</p>
              <p className="text-xs text-muted-foreground">Minutes Focused</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 text-center">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">Goal Sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Material */}
      {!isBreak && (
        <Card>
          <CardHeader>
            <Badge variant="secondary">Currently Studying</Badge>
            <CardTitle className="text-xl mt-2">Database Normalization</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground">
              Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. 
              It involves dividing large tables into smaller tables and defining relationships between them.
            </p>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mt-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-warning" />
                Key Point
              </h4>
              <p className="text-sm text-muted-foreground m-0">
                The three normal forms (1NF, 2NF, 3NF) progressively eliminate data redundancy.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button variant="outline" className="w-full" onClick={onEnd}>
        End Session
      </Button>
    </div>
  );
}

// Feynman Session Component
function FeynmanSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [step, setStep] = useState<"explain" | "feedback" | "problem">("explain");
  const [explanation, setExplanation] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
        <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">Step 1: Explain</Badge>
            <h2 className="text-2xl font-bold mb-2">What is Database Normalization?</h2>
            <p className="text-muted-foreground">Explain this concept as if you're teaching it to a 10-year-old</p>
          </div>

          <div className={cn("p-6 rounded-2xl mb-6", method.bgColor)}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className={cn("w-5 h-5", method.color)} />
              <span className="font-semibold">Your Explanation</span>
            </div>
            <textarea
              className="w-full h-40 p-4 rounded-xl border bg-background resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
              <p className="text-sm mb-3">Great analogy! You correctly identified the core purpose. However, you missed these key points:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning mt-2" />
                  <span>Mention the 3 Normal Forms (1NF, 2NF, 3NF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning mt-2" />
                  <span>Explain how it prevents data anomalies</span>
                </li>
              </ul>
            </div>
          )}

          <Button 
            className="w-full gradient-primary" 
            onClick={() => setShowFeedback(true)}
            disabled={explanation.length < 20}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Explanation
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={onEnd}>
        End Session
      </Button>
    </div>
  );
}

// Leitner Flashcard Session Component
function LeitnerSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  const cards = [
    { front: "What is 1NF (First Normal Form)?", back: "Each cell contains a single value (no lists or arrays). Each row is unique.", box: 1 },
    { front: "What is 2NF (Second Normal Form)?", back: "Must be in 1NF + all non-key columns depend on the ENTIRE primary key.", box: 2 },
    { front: "What is 3NF (Third Normal Form)?", back: "Must be in 2NF + no transitive dependencies (non-key columns shouldn't depend on other non-key columns).", box: 1 },
    { front: "What is denormalization?", back: "The process of adding redundancy to improve read performance, sacrificing some normalization.", box: 3 },
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
        </div>
      </div>

      {/* Flashcard */}
      <Card className={cn("border-2 overflow-hidden min-h-[400px]", method.borderColor)}>
        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[360px]">
          <Badge variant="secondary" className="mb-6">Box {card.box}</Badge>
          
          {!showAnswer ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8">{card.front}</h2>
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
          <h3 className="font-semibold mb-4">Leitner Box Progress</h3>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((box) => (
              <div key={box} className={cn(
                "p-4 rounded-xl text-center border-2",
                box <= 2 ? "border-destructive/30 bg-destructive/5" : 
                box === 3 ? "border-warning/30 bg-warning/5" : 
                "border-success/30 bg-success/5"
              )}>
                <p className="text-2xl font-bold">{cards.filter(c => c.box === box).length}</p>
                <p className="text-xs text-muted-foreground">Box {box}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={onEnd}>
        End Session
      </Button>
    </div>
  );
}

// Multi-Sensory Session Component
function MultiSensorySession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [mode, setMode] = useState<"read" | "listen" | "quiz">("read");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: "read", icon: BookOpen, label: "Read", color: "from-blue-500 to-cyan-500" },
          { id: "listen", icon: Headphones, label: "Listen", color: "from-purple-500 to-pink-500" },
          { id: "quiz", icon: HelpCircle, label: "Quiz", color: "from-green-500 to-emerald-500" },
        ].map((m) => (
          <Button
            key={m.id}
            variant={mode === m.id ? "default" : "outline"}
            className={cn("h-24 flex-col", mode === m.id && `bg-gradient-to-br ${m.color}`)}
            onClick={() => setMode(m.id as any)}
          >
            <m.icon className="w-8 h-8 mb-2" />
            {m.label}
          </Button>
        ))}
      </div>

      <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500" />
        <CardContent className="p-8">
          {mode === "read" && (
            <div className="prose prose-sm max-w-none">
              <h2>Database Normalization</h2>
              <p className="text-muted-foreground">
                <span className="bg-yellow-200/50 dark:bg-yellow-500/20 px-1">Database normalization</span> is the process of structuring a relational database to reduce data redundancy and improve data integrity.
              </p>
              <h3>First Normal Form (1NF)</h3>
              <p className="text-muted-foreground">
                A table is in 1NF if it contains no repeating groups. Each cell should contain <span className="bg-yellow-200/50 dark:bg-yellow-500/20 px-1">only a single value</span>.
              </p>
              <h3>Second Normal Form (2NF)</h3>
              <p className="text-muted-foreground">
                A table is in 2NF if it is in 1NF and every non-key column is <span className="bg-yellow-200/50 dark:bg-yellow-500/20 px-1">fully dependent on the primary key</span>.
              </p>
            </div>
          )}

          {mode === "listen" && (
            <div className="text-center py-8">
              <div className={cn("w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center", method.bgColor)}>
                <Headphones className={cn("w-16 h-16", method.color)} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Audio Mode</h3>
              <p className="text-muted-foreground mb-8">Listen to AI-generated audio of the material</p>
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
            </div>
          )}

          {mode === "quiz" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Quick Quiz</h3>
              <div className="p-6 rounded-xl bg-muted/50">
                <p className="font-medium mb-4">What is the main purpose of database normalization?</p>
                <div className="space-y-3">
                  {[
                    "To make the database faster",
                    "To reduce data redundancy and improve integrity",
                    "To add more tables",
                    "To increase storage usage"
                  ].map((option, i) => (
                    <Button key={i} variant="outline" className="w-full justify-start text-left h-auto py-3">
                      <span className="w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={onEnd}>
        End Session
      </Button>
    </div>
  );
}

// Generic Session Component for other methods
function GenericSession({ method, course, onEnd }: { method: StudyMethod; course: any; onEnd: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className={cn("border-2 overflow-hidden", method.borderColor)}>
        <div className={cn("h-2 bg-gradient-to-r", method.id === "interleaved" ? "from-blue-500 to-cyan-500" : 
          method.id === "progressive" ? "from-green-500 to-emerald-500" :
          method.id === "problem-cycling" ? "from-yellow-500 to-amber-500" :
          method.id === "chunking" ? "from-teal-500 to-cyan-500" :
          method.id === "reverse" ? "from-pink-500 to-rose-500" :
          "from-indigo-500 to-purple-500")} />
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", method.bgColor)}>
                <method.icon className={cn("w-7 h-7", method.color)} />
              </div>
              <div>
                <h2 className="font-bold text-xl">{method.name}</h2>
                <p className="text-sm text-muted-foreground">{course?.name}</p>
              </div>
            </div>
            <Badge>{progress}% Complete</Badge>
          </div>

          <Progress value={progress} className="h-3 mb-8" />

          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-4">Current Concept</Badge>
              <h3 className="text-xl font-bold mb-4">Database Normalization</h3>
              <p className="text-muted-foreground mb-6">
                Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.
              </p>

              {method.id === "reverse" && (
                <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <p className="font-semibold mb-2">Answer: "3NF"</p>
                  <p className="text-sm text-muted-foreground">What question would lead to this answer?</p>
                  <textarea className="w-full mt-3 p-3 rounded-lg border bg-background" placeholder="Type your question..." />
                </div>
              )}

              {method.id === "question-first" && (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <p className="font-semibold mb-2">Question: What are the three normal forms?</p>
                  <p className="text-sm text-muted-foreground mb-3">Find the answer in the material above</p>
                  <textarea className="w-full p-3 rounded-lg border bg-background" placeholder="Type your answer..." />
                </div>
              )}

              {method.id === "problem-cycling" && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <p className="font-semibold mb-2">Problem:</p>
                  <p className="text-sm text-muted-foreground mb-3">Given a table with columns (OrderID, ProductName, ProductPrice, CustomerName, CustomerAddress), normalize it to 3NF.</p>
                  <textarea className="w-full p-3 rounded-lg border bg-background h-32" placeholder="Describe your normalized tables..." />
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onEnd}>
          End Session
        </Button>
        <Button className="flex-1 gradient-primary">
          <Sparkles className="w-4 h-4 mr-2" />
          Get AI Help
        </Button>
      </div>
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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">How It Works</h3>
                  <div className="space-y-3">
                    {selectedMethod.howItWorks.map((step, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-xl bg-muted/50">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white", 
                          selectedMethod.bgColor.replace("/20", "").replace("from-", "bg-").split(" ")[0].replace("bg-gradient-to-br", "bg-gradient-to-r")
                        )} style={{ background: `linear-gradient(135deg, ${selectedMethod.color.replace("text-", "").replace("-500", "")} 0%, ${selectedMethod.color.replace("text-", "").replace("-500", "")} 100%)` }}>
                          <span className="gradient-primary bg-clip-text">{i + 1}</span>
                        </div>
                        <p className="text-sm pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMethod.aiFeatures.map((feature) => (
                      <div key={feature} className={cn("p-3 rounded-xl border text-center", selectedMethod.borderColor, selectedMethod.bgColor)}>
                        <p className="text-sm font-medium">{feature}</p>
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
                      <Checkbox
                        checked={selectedUnits.includes(unit.id)}
                        onCheckedChange={(checked) => {
                          setSelectedUnits((prev) =>
                            checked ? [...prev, unit.id] : prev.filter((id) => id !== unit.id)
                          );
                        }}
                      />
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

  // Method selection grid
  return (
    <DashboardLayout title="Study Room">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Choose Your Study Method</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each method has a unique AI-powered interface designed for its specific learning mechanism.
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
                    <h3 className="font-semibold text-sm mb-1 truncate">{method.name}</h3>
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
