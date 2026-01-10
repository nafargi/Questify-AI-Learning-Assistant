import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Download, Copy, Check, Loader2, FileText, ChevronDown, Zap, RotateCcw, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { courses, noteMethods } from "@/data/mockData";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import all note method components
import { CornellNote } from "@/components/notes/CornellNote";
import { MindMapNote } from "@/components/notes/MindMapNote";
import { OutlineNote } from "@/components/notes/OutlineNote";
import { BoxingNote } from "@/components/notes/BoxingNote";
import { ChartingNote } from "@/components/notes/ChartingNote";
import { ZettelkastenNote } from "@/components/notes/ZettelkastenNote";
import { FeynmanNote } from "@/components/notes/FeynmanNote";
import { FlowchartNote } from "@/components/notes/FlowchartNote";
import { SentenceNote } from "@/components/notes/SentenceNote";
import { SketchNote } from "@/components/notes/SketchNote";

// Course color palette
const courseColors: Record<string, { bg: string; border: string; gradient: string; accent: string; light: string }> = {
  'cs101': {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'text-blue-600 dark:text-blue-400',
    light: 'bg-blue-50 dark:bg-blue-950/30'
  },
  'math201': {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    gradient: 'from-violet-500 to-purple-500',
    accent: 'text-violet-600 dark:text-violet-400',
    light: 'bg-violet-50 dark:bg-violet-950/30'
  },
  'bio101': {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-500',
    accent: 'text-emerald-600 dark:text-emerald-400',
    light: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
  'hist101': {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500 to-orange-500',
    accent: 'text-amber-600 dark:text-amber-400',
    light: 'bg-amber-50 dark:bg-amber-950/30'
  },
  'bus101': {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    gradient: 'from-rose-500 to-pink-500',
    accent: 'text-rose-600 dark:text-rose-400',
    light: 'bg-rose-50 dark:bg-rose-950/30'
  },
};

// Sample content for each note type
const sampleNoteContent = {
  cornell: {
    cues: ["What is a variable?", "Data types?", "Control flow?", "Functions?"],
    notes: [
      "A variable is a named storage location in memory that holds a value. Variables can be declared using let, const, or var in JavaScript.",
      "Common data types include: strings (text), numbers (integers and floats), booleans (true/false), arrays (ordered lists), and objects (key-value pairs).",
      "Control flow determines the order in which code executes. Includes: if/else statements, switch cases, and loops (for, while, do-while).",
      "Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values."
    ],
    summary: "Variables store data, which comes in different types. Control flow manages execution order, and functions enable code reuse. These are the fundamental building blocks of programming."
  },
  mindmap: {
    center: "Data Structures",
    branches: [
      { title: "Linear", items: ["Arrays", "Linked Lists", "Stacks", "Queues"], color: "bg-blue-100" },
      { title: "Non-Linear", items: ["Trees", "Graphs", "Heaps"], color: "bg-green-100" },
      { title: "Hash-Based", items: ["Hash Tables", "Hash Maps", "Sets"], color: "bg-purple-100" },
      { title: "Operations", items: ["Insert", "Delete", "Search", "Sort"], color: "bg-orange-100" },
    ]
  },
  outline: {
    sections: [
      { title: "Introduction to Algorithms", points: [
        { main: "Definition", sub: ["Step-by-step procedure", "Solves computational problems"] },
        { main: "Characteristics", sub: ["Finite", "Definite", "Effective"] }
      ]},
      { title: "Algorithm Analysis", points: [
        { main: "Time Complexity", sub: ["Big O notation", "Best/Worst/Average case"] },
        { main: "Space Complexity", sub: ["Memory usage", "In-place algorithms"] }
      ]}
    ]
  },
  boxing: {
    boxes: [
      { title: "Variables", color: "blue", items: ["Store data values", "Can be reassigned", "Have scope rules"] },
      { title: "Functions", color: "green", items: ["Reusable code blocks", "Accept parameters", "Return values"] },
      { title: "Loops", color: "purple", items: ["Repeat code", "for, while, do-while", "Break and continue"] },
      { title: "Conditionals", color: "orange", items: ["if/else statements", "Switch cases", "Ternary operator"] },
    ]
  },
  charting: {
    headers: ["Data Structure", "Access", "Search", "Insert", "Delete"],
    rows: [
      ["Array", "O(1)", "O(n)", "O(n)", "O(n)"],
      ["Linked List", "O(n)", "O(n)", "O(1)", "O(1)"],
      ["Hash Table", "N/A", "O(1)", "O(1)", "O(1)"],
      ["Binary Tree", "O(log n)", "O(log n)", "O(log n)", "O(log n)"],
    ]
  },
  zettelkasten: {
    notes: [
      { id: "1a", title: "What is Recursion?", content: "A function that calls itself to solve smaller instances of the same problem.", links: ["1b", "2a"], tags: ["fundamentals", "algorithms"] },
      { id: "1b", title: "Base Case", content: "The condition that stops recursion. Without it, infinite loop occurs.", links: ["1a"], tags: ["recursion"] },
      { id: "2a", title: "Call Stack", content: "Memory structure that tracks function calls. Each recursive call adds a frame.", links: ["1a", "2b"], tags: ["memory", "execution"] },
    ]
  },
  feynman: {
    concept: "Recursion in Programming",
    simpleExplanation: "Imagine you have a set of Russian nesting dolls. To find the smallest doll, you open one, find another inside, and keep opening until you find the tiny one that can't be opened. That's recursion - a problem that contains smaller versions of itself until you reach the simplest case.",
    gaps: ["Not clear on how the call stack works", "Confused about when to use recursion vs loops"],
    refinedExplanation: "Recursion is like standing between two mirrors - each reflection contains another reflection. In code, a function calls itself with a simpler input until it reaches a 'base case' (the smallest doll). The computer remembers each call in a 'stack' and works backward to get the final answer."
  },
  flowchart: {
    title: "How to Solve a Recursion Problem",
    nodes: [
      { id: "1", type: "start" as const, text: "Start", connections: ["2"] },
      { id: "2", type: "process" as const, text: "Identify base case", connections: ["3"] },
      { id: "3", type: "decision" as const, text: "Is base case?", connections: ["4", "5"] },
      { id: "4", type: "process" as const, text: "Return result", connections: ["6"] },
      { id: "5", type: "process" as const, text: "Break into subproblem", connections: ["3"] },
      { id: "6", type: "end" as const, text: "End", connections: [] },
    ]
  },
  sentence: {
    sentences: [
      "A variable is a container that stores data values in memory.",
      "JavaScript has three ways to declare variables: var, let, and const.",
      "The 'const' keyword creates a variable that cannot be reassigned.",
      "Data types include strings, numbers, booleans, arrays, and objects.",
      "Functions are reusable blocks of code that perform specific tasks.",
      "Parameters are variables listed in the function definition.",
      "Arguments are the actual values passed to the function when called.",
    ]
  },
  sketchnote: {
    title: "JavaScript Basics",
    sections: [
      { heading: "Variables", notes: ["Named containers for data", "Use const for constants", "Use let for changing values"], icon: "📦" },
      { heading: "Functions", notes: ["Reusable code blocks", "Can take inputs (parameters)", "Can return outputs"], icon: "⚡" },
      { heading: "Data Types", notes: ["Strings for text", "Numbers for math", "Booleans for true/false"], icon: "🎨" },
      { heading: "Control Flow", notes: ["if/else for decisions", "Loops for repetition", "Switch for multiple cases"], icon: "🔀" },
    ]
  }
};

// Previously generated notes (mock data)
const recentNotes = [
  { id: 1, courseId: 'cs101', method: 'cornell', title: 'Data Structures Overview', date: '2 hours ago' },
  { id: 2, courseId: 'bio101', method: 'mindmap', title: 'Cell Biology', date: 'Yesterday' },
  { id: 3, courseId: 'math201', method: 'outline', title: 'Calculus Fundamentals', date: '3 days ago' },
];

export default function Notes() {
  const { preferences, setLastCourse, setPreferredNoteMethod, addRecentCourse } = useAppContext();
  
  // Single-action state
  const [selectedCourse, setSelectedCourse] = useState<string>(preferences.lastCourseId || "");
  const [selectedMethod, setSelectedMethod] = useState<string>(preferences.preferredNoteMethod || "cornell");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Set defaults from preferences
  useEffect(() => {
    if (preferences.lastCourseId && !selectedCourse) {
      setSelectedCourse(preferences.lastCourseId);
    }
    if (preferences.preferredNoteMethod && !selectedMethod) {
      setSelectedMethod(preferences.preferredNoteMethod);
    }
  }, [preferences]);

  const course = courses.find((c) => c.id === selectedCourse);
  const courseColor = courseColors[selectedCourse] || courseColors['cs101'];
  const method = noteMethods.find((m) => m.id === selectedMethod);

  const handleGenerate = () => {
    if (!selectedCourse) {
      toast.error("Please select a course first");
      return;
    }

    // Save preferences
    setLastCourse(selectedCourse);
    setPreferredNoteMethod(selectedMethod);
    addRecentCourse(selectedCourse);

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const contentMap: Record<string, any> = {
        cornell: sampleNoteContent.cornell,
        mindmap: sampleNoteContent.mindmap,
        outline: sampleNoteContent.outline,
        boxing: sampleNoteContent.boxing,
        charting: sampleNoteContent.charting,
        zettelkasten: sampleNoteContent.zettelkasten,
        feynman: sampleNoteContent.feynman,
        flowchart: sampleNoteContent.flowchart,
        sentence: sampleNoteContent.sentence,
        sketchnote: sampleNoteContent.sketchnote,
      };
      
      setGeneratedNote({ 
        method: selectedMethod, 
        content: contentMap[selectedMethod] || sampleNoteContent.outline,
        course: course,
        courseColor: courseColor
      });
      setIsGenerating(false);
      toast.success("Notes generated successfully!");
    }, 2000);
  };

  const handleReset = () => {
    setGeneratedNote(null);
  };

  const handleCopy = () => {
    setCopied(true);
    toast.success("Notes copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    toast.success("PDF export started");
  };

  const renderNote = () => {
    if (!generatedNote) return null;
    switch (generatedNote.method) {
      case "cornell": return <CornellNote content={generatedNote.content} />;
      case "mindmap": return <MindMapNote content={generatedNote.content} />;
      case "outline": return <OutlineNote content={generatedNote.content} />;
      case "boxing": return <BoxingNote content={generatedNote.content} />;
      case "charting": return <ChartingNote content={generatedNote.content} />;
      case "zettelkasten": return <ZettelkastenNote content={generatedNote.content} />;
      case "feynman": return <FeynmanNote content={generatedNote.content} />;
      case "flowchart": return <FlowchartNote content={generatedNote.content} />;
      case "sentence": return <SentenceNote content={generatedNote.content} />;
      case "sketchnote": return <SketchNote content={generatedNote.content} />;
      default: return <OutlineNote content={sampleNoteContent.outline} />;
    }
  };

  // Generator View - Single action interface
  const GeneratorView = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Generate Card */}
      <Card className="overflow-hidden border-2 border-primary/20">
        <div className="h-1 gradient-primary" />
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Course Selection */}
            <div className="flex-1 w-full lg:w-auto space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      <span className="flex items-center gap-2">
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Method Selection */}
            <div className="flex-1 w-full lg:w-auto space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Note Style</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full h-12 justify-between text-base">
                    <span className="flex items-center gap-2">
                      <span>{method?.icon}</span>
                      <span>{method?.name || "Select style"}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72" align="start">
                  {noteMethods.map((m) => (
                    <DropdownMenuItem
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className="flex items-start gap-3 py-3"
                    >
                      <span className="text-xl mt-0.5">{m.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.bestFor}</div>
                      </div>
                      {selectedMethod === m.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Generate Button */}
            <Button 
              size="lg"
              onClick={handleGenerate}
              disabled={!selectedCourse || isGenerating}
              className="w-full lg:w-auto h-12 px-8 gradient-primary text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Notes
                </>
              )}
            </Button>
          </div>

          {/* Smart defaults hint */}
          {preferences.lastCourseId && (
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Using your last selected course and preferred note style
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recent Notes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookMarked className="w-5 h-5" />
            Recent Notes
          </h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentNotes.map((note) => {
            const noteCourse = courses.find((c) => c.id === note.courseId);
            const noteColor = courseColors[note.courseId] || courseColors['cs101'];
            const noteMethod = noteMethods.find((m) => m.id === note.method);
            
            return (
              <button
                key={note.id}
                onClick={() => {
                  setSelectedCourse(note.courseId);
                  setSelectedMethod(note.method);
                  toast.info("Course and style loaded. Click Generate to create new notes.");
                }}
                className={cn(
                  "group text-left p-4 rounded-xl border-2 transition-all duration-200 hover-lift",
                  noteColor.border,
                  noteColor.light
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-lg",
                    "bg-gradient-to-br text-white",
                    noteColor.gradient
                  )}>
                    {noteCourse?.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {noteMethod?.icon} {noteMethod?.name}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{note.title}</h3>
                <p className="text-xs text-muted-foreground">{note.date}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* All Note Styles Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Available Note Styles
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {noteMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMethod(m.id);
                toast.success(`${m.name} style selected`);
              }}
              className={cn(
                "p-4 rounded-xl border-2 text-center transition-all duration-200 hover-lift",
                selectedMethod === m.id 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/30"
              )}
            >
              <span className="text-2xl block mb-2">{m.icon}</span>
              <span className="text-xs font-medium">{m.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Generated Note View
  const GeneratedNoteView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {generatedNote.course && (
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
              "bg-gradient-to-r text-white",
              generatedNote.courseColor.gradient
            )}>
              <span>{generatedNote.course.icon}</span>
              {generatedNote.course.name}
            </div>
          )}
          <Badge variant="outline" className="flex items-center gap-1.5">
            <span>{method?.icon}</span>
            {method?.name}
          </Badge>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className={cn(
          "h-1.5 bg-gradient-to-r",
          generatedNote.courseColor.gradient
        )} />
        <CardContent className="p-6 md:p-8">
          {renderNote()}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout title="AI Notes Generator">
      <div className="max-w-6xl mx-auto">
        {!generatedNote ? <GeneratorView /> : <GeneratedNoteView />}
      </div>
    </DashboardLayout>
  );
}
