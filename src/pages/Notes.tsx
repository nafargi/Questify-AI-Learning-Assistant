import { useState } from "react";
import { BookOpen, Sparkles, Download, Copy, Check, Loader2, FileText, ChevronRight, Grid3X3, Layers, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { courses, noteMethods } from "@/data/mockData";

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

// Course color palette - each course has a distinct gradient
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

type Step = 'course' | 'units' | 'method';

export default function Notes() {
  const [step, setStep] = useState<Step>('course');
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const course = courses.find((c) => c.id === selectedCourse);
  const courseColor = courseColors[selectedCourse] || courseColors['cs101'];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedUnits([]);
    setStep('units');
  };

  const handleUnitsNext = () => {
    if (selectedUnits.length > 0) {
      setStep('method');
    }
  };

  const handleBack = () => {
    if (step === 'units') {
      setStep('course');
      setSelectedCourse('');
      setSelectedUnits([]);
    } else if (step === 'method') {
      setStep('units');
      setSelectedMethod('');
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
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
      setGeneratedNote({ method: selectedMethod, content: contentMap[selectedMethod] || sampleNoteContent.outline });
      setIsGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setGeneratedNote(null);
    setStep('course');
    setSelectedCourse('');
    setSelectedUnits([]);
    setSelectedMethod('');
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

  // Step indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-8">
      {[
        { key: 'course', label: 'Course', icon: BookOpen },
        { key: 'units', label: 'Units', icon: Layers },
        { key: 'method', label: 'Method', icon: Grid3X3 },
      ].map((s, index) => (
        <div key={s.key} className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
            step === s.key 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
              : (step === 'units' && s.key === 'course') || (step === 'method' && (s.key === 'course' || s.key === 'units'))
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
          )}>
            <s.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{s.label}</span>
          </div>
          {index < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );

  // Course Selection View
  const CourseSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select a Course</h2>
        <p className="text-muted-foreground">Choose the course you want to generate notes for</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {courses.map((c) => {
          const colors = courseColors[c.id] || courseColors['cs101'];
          return (
            <button
              key={c.id}
              onClick={() => handleCourseSelect(c.id)}
              className={cn(
                "group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover-lift overflow-hidden",
                colors.border,
                colors.light,
                "hover:shadow-xl"
              )}
            >
              {/* Gradient accent bar */}
              <div className={cn(
                "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                colors.gradient
              )} />
              
              {/* Icon with gradient background */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4",
                "bg-gradient-to-br shadow-lg",
                colors.gradient
              )}>
                {c.icon}
              </div>
              
              <h3 className="font-bold text-lg mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{c.description}</p>
              
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={colors.accent}>{c.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full bg-gradient-to-r transition-all", colors.gradient)}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
              
              {/* Units count */}
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="secondary" className={cn(colors.bg, colors.accent, "border-0")}>
                  {c.units.length} Units
                </Badge>
              </div>

              {/* Hover arrow */}
              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className={cn("w-5 h-5", colors.accent)} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Units Selection View
  const UnitsSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </button>

      {course && (
        <>
          {/* Course header */}
          <div className={cn("p-6 rounded-2xl", courseColor.light, "border", courseColor.border)}>
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center text-3xl",
                "bg-gradient-to-br shadow-lg",
                courseColor.gradient
              )}>
                {course.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">{course.name}</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Units list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Select Units</h3>
              <span className="text-sm text-muted-foreground">
                {selectedUnits.length} of {course.units.length} selected
              </span>
            </div>

            <div className="grid gap-3">
              {course.units.map((unit, index) => (
                <label
                  key={unit.id}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover-lift",
                    selectedUnits.includes(unit.id) 
                      ? cn(courseColor.border, courseColor.bg) 
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="pt-0.5">
                    <Checkbox
                      checked={selectedUnits.includes(unit.id)}
                      onCheckedChange={(checked) => {
                        setSelectedUnits((prev) => 
                          checked ? [...prev, unit.id] : prev.filter((id) => id !== unit.id)
                        );
                      }}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                        "bg-gradient-to-br text-white",
                        courseColor.gradient
                      )}>
                        {index + 1}
                      </span>
                      <h4 className="font-semibold">{unit.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 pl-11">{unit.description}</p>
                    <div className="pl-11 flex flex-wrap gap-2">
                      {unit.topics.map((topic, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-xs bg-muted/50"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    {/* Mastery indicator */}
                    <div className="pl-11 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full bg-gradient-to-r", courseColor.gradient)}
                            style={{ width: `${unit.mastery}%` }}
                          />
                        </div>
                        <span className={cn("text-xs font-medium", courseColor.accent)}>{unit.mastery}% mastery</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Select all / Continue button */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => {
                  if (selectedUnits.length === course.units.length) {
                    setSelectedUnits([]);
                  } else {
                    setSelectedUnits(course.units.map(u => u.id));
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {selectedUnits.length === course.units.length ? 'Deselect All' : 'Select All Units'}
              </button>
              <Button 
                onClick={handleUnitsNext}
                disabled={selectedUnits.length === 0}
                className={cn("bg-gradient-to-r", courseColor.gradient, "text-white hover:opacity-90")}
              >
                Continue to Method
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Method Selection View
  const MethodSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Units
      </button>

      {/* Summary of selection */}
      {course && (
        <div className={cn("p-4 rounded-xl flex items-center gap-4", courseColor.light, "border", courseColor.border)}>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-xl",
            "bg-gradient-to-br",
            courseColor.gradient
          )}>
            {course.icon}
          </div>
          <div>
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedUnits.length} units selected</p>
          </div>
        </div>
      )}

      {/* Method selection */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Choose Note-Taking Method</h2>
          <p className="text-muted-foreground">Each method has a unique layout designed for its learning approach</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {noteMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "group relative p-5 rounded-xl border-2 text-left transition-all duration-300 hover-lift",
                selectedMethod === method.id 
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                  : "border-border hover:border-primary/50"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3",
                "bg-gradient-to-br shadow-md",
                method.color
              )}>
                {method.icon}
              </div>

              <h4 className="font-bold text-sm mb-1">{method.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{method.bestFor}</p>

              {/* Selection indicator */}
              {selectedMethod === method.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center pt-6">
        <Button 
          size="lg" 
          disabled={!selectedMethod || isGenerating}
          onClick={handleGenerate}
          className={cn(
            "min-w-[240px] bg-gradient-to-r text-white shadow-lg hover:opacity-90 transition-opacity",
            courseColor.gradient
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Notes...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Notes
            </>
          )}
        </Button>
      </div>
    </div>
  );

  // Generated Note View
  const GeneratedNoteView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {course && (
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
              "bg-gradient-to-r text-white",
              courseColor.gradient
            )}>
              <span>{course.icon}</span>
              {course.name}
            </div>
          )}
          <Badge variant="outline" className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            {noteMethods.find((m) => m.id === selectedMethod)?.name}
          </Badge>
          <Badge variant="secondary">{selectedUnits.length} units</Badge>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => { 
              setCopied(true); 
              setTimeout(() => setCopied(false), 2000); 
            }}
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Generate New
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className={cn(
          "h-1.5 bg-gradient-to-r",
          courseColor.gradient
        )} />
        <CardContent className="p-6 md:p-8">
          {renderNote()}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout title="AI Notes Generator">
      {!generatedNote ? (
        <div className="max-w-6xl mx-auto">
          <StepIndicator />
          {step === 'course' && <CourseSelection />}
          {step === 'units' && <UnitsSelection />}
          {step === 'method' && <MethodSelection />}
        </div>
      ) : (
        <GeneratedNoteView />
      )}
    </DashboardLayout>
  );
}
