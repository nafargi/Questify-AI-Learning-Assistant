import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  Download,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { courses, noteMethods } from "@/data/mockData";

// Visual Note Renderers
function CornellNote({ content }: { content: any }) {
  return (
    <div className="border-2 border-primary/20 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-3 min-h-[400px]">
        <div className="col-span-1 bg-primary/5 p-4 border-r-2 border-primary/20">
          <h4 className="font-bold text-sm text-primary mb-4 uppercase tracking-wide">Cue Column</h4>
          <div className="space-y-4">
            {content.cues.map((cue: string, i: number) => (
              <div key={i} className="p-3 bg-card rounded-xl border border-primary/10">
                <p className="text-sm font-medium text-primary">{cue}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 p-4">
          <h4 className="font-bold text-sm text-muted-foreground mb-4 uppercase tracking-wide">Notes</h4>
          <div className="space-y-3">
            {content.notes.map((note: string, i: number) => (
              <p key={i} className="text-sm leading-relaxed">{note}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-primary/20 bg-secondary/5 p-4">
        <h4 className="font-bold text-sm text-secondary mb-2 uppercase tracking-wide">Summary</h4>
        <p className="text-sm text-muted-foreground">{content.summary}</p>
      </div>
    </div>
  );
}

function MindMapNote({ content }: { content: any }) {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl min-h-[400px]">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full gradient-primary flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
          <span className="text-white font-bold text-center text-lg px-4">{content.center}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {content.branches.map((branch: any, i: number) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-2 h-12 bg-gradient-to-b from-primary to-secondary rounded-full mb-2" />
              <div className={cn("p-4 rounded-2xl text-center w-full", branch.color)}>
                <h4 className="font-bold text-sm mb-2">{branch.title}</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {branch.items.map((item: string, j: number) => (
                    <li key={j}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutlineNote({ content }: { content: any }) {
  return (
    <div className="p-6 bg-muted/30 rounded-2xl space-y-4">
      {content.sections.map((section: any, i: number) => (
        <div key={i} className="space-y-2">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">{i + 1}</span>
            {section.title}
          </h3>
          <div className="ml-10 space-y-2">
            {section.points.map((point: any, j: number) => (
              <div key={j} className="space-y-1">
                <p className="font-medium text-sm flex items-center gap-2">
                  <span className="text-secondary">{String.fromCharCode(65 + j)}.</span>
                  {point.main}
                </p>
                {point.sub && (
                  <ul className="ml-6 space-y-1">
                    {point.sub.map((s: string, k: number) => (
                      <li key={k} className="text-sm text-muted-foreground">• {s}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartingNote({ content }: { content: any }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {content.headers.map((h: string, i: number) => (
              <th key={i} className="p-4 text-left text-sm font-bold bg-primary text-primary-foreground first:rounded-tl-xl last:rounded-tr-xl">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row: string[], i: number) => (
            <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : "bg-muted/10"}>
              {row.map((cell: string, j: number) => (
                <td key={j} className="p-4 text-sm border-b border-border">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
      { title: "Linear", items: ["Arrays", "Linked Lists", "Stacks", "Queues"], color: "bg-blue-100 dark:bg-blue-900/30" },
      { title: "Non-Linear", items: ["Trees", "Graphs", "Heaps"], color: "bg-green-100 dark:bg-green-900/30" },
      { title: "Hash-Based", items: ["Hash Tables", "Hash Maps", "Sets"], color: "bg-purple-100 dark:bg-purple-900/30" },
      { title: "Operations", items: ["Insert", "Delete", "Search", "Sort"], color: "bg-orange-100 dark:bg-orange-900/30" },
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
  charting: {
    headers: ["Data Structure", "Access", "Search", "Insert", "Delete"],
    rows: [
      ["Array", "O(1)", "O(n)", "O(n)", "O(n)"],
      ["Linked List", "O(n)", "O(n)", "O(1)", "O(1)"],
      ["Hash Table", "N/A", "O(1)", "O(1)", "O(1)"],
      ["Binary Tree", "O(log n)", "O(log n)", "O(log n)", "O(log n)"],
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
      const content = selectedMethod === "cornell" ? sampleNoteContent.cornell
        : selectedMethod === "mindmap" ? sampleNoteContent.mindmap
        : selectedMethod === "outline" ? sampleNoteContent.outline
        : selectedMethod === "charting" ? sampleNoteContent.charting
        : sampleNoteContent.outline;
      setGeneratedNote({ method: selectedMethod, content });
      setIsGenerating(false);
    }, 2000);
  };

  const renderNote = () => {
    if (!generatedNote) return null;
    switch (generatedNote.method) {
      case "cornell": return <CornellNote content={generatedNote.content} />;
      case "mindmap": return <MindMapNote content={generatedNote.content} />;
      case "outline": return <OutlineNote content={generatedNote.content} />;
      case "charting": return <ChartingNote content={generatedNote.content} />;
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
                <CardDescription>Choose from 10 powerful methods</CardDescription>
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
