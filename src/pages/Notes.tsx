import { useState } from "react";
import { BookOpen, Sparkles, Download, Copy, Check, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export default function Notes() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const course = courses.find((c) => c.id === selectedCourse);

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

  return (
    <DashboardLayout title="AI Notes Generator">
      {!generatedNote ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Select Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
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
                      <span className="font-medium text-sm block">{c.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {course && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Select Units</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.units.map((unit) => (
                    <label key={unit.id} className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                      selectedUnits.includes(unit.id) ? "border-primary bg-primary/5" : "border-border"
                    )}>
                      <Checkbox
                        checked={selectedUnits.includes(unit.id)}
                        onCheckedChange={(checked) => {
                          setSelectedUnits((prev) => checked ? [...prev, unit.id] : prev.filter((id) => id !== unit.id));
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{unit.title}</p>
                        <p className="text-xs text-muted-foreground">{unit.description}</p>
                      </div>
                    </label>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Note-Taking Method</CardTitle>
                <CardDescription>Choose from 10 powerful methods - each with unique UI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {noteMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                        selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2 bg-gradient-to-br", method.color)}>
                        {method.icon}
                      </div>
                      <h4 className="font-semibold text-sm">{method.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{method.bestFor}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full gradient-primary" size="lg" disabled={!selectedCourse || !selectedMethod || isGenerating} onClick={handleGenerate}>
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4 mr-2" />Generate Notes</>}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{course?.name}</Badge>
              <Badge variant="outline">{noteMethods.find((m) => m.id === selectedMethod)?.name}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                {copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy</>}
              </Button>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export PDF</Button>
              <Button variant="outline" onClick={() => setGeneratedNote(null)}>Generate New</Button>
            </div>
          </div>
          <Card><CardContent className="p-6">{renderNote()}</CardContent></Card>
        </div>
      )}
    </DashboardLayout>
  );
}
