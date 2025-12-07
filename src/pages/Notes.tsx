import { useState } from "react";
import {
  BookOpen,
  FileText,
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
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses, noteMethods } from "@/data/mockData";

export default function Notes() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const course = courses.find((c) => c.id === selectedCourse);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const method = noteMethods.find((m) => m.id === selectedMethod);
      const sampleNote = generateSampleNote(method?.name || "Outline");
      setGeneratedNote(sampleNote);
      setIsGenerating(false);
    }, 3000);
  };

  const generateSampleNote = (methodName: string): string => {
    if (methodName === "Cornell Method") {
      return `# Data Structures - Cornell Notes

## Cues | Notes
---

**What is a data structure?** | A data structure is a specialized format for organizing, processing, retrieving and storing data. They make data access and algorithms more efficient.

**Types of Data Structures** | 
- **Linear**: Arrays, Linked Lists, Stacks, Queues
- **Non-linear**: Trees, Graphs
- **Hash-based**: Hash Tables, Hash Maps

**Why are they important?** | 
- Efficient data organization
- Faster algorithms
- Better memory management
- Foundation for complex systems

**Array vs Linked List** | 
- Arrays: Contiguous memory, O(1) access, fixed size
- Linked Lists: Non-contiguous, O(n) access, dynamic size

---

## Summary
Data structures are fundamental building blocks in computer science that determine how data is stored and accessed. Understanding the trade-offs between different structures (like arrays vs linked lists) is crucial for writing efficient code. Key considerations include time complexity for operations and memory usage.`;
    }
    
    return `# Data Structures - Study Notes

## 1. Introduction to Data Structures

A **data structure** is a specialized format for organizing, processing, retrieving, and storing data. Efficient data structures are key to designing efficient algorithms.

### 1.1 Why Data Structures Matter
- Enable efficient data organization
- Optimize algorithm performance
- Reduce memory usage
- Foundation for complex systems

## 2. Types of Data Structures

### 2.1 Linear Data Structures
Data elements are arranged in a sequential manner.

#### Arrays
- Fixed-size collection of elements
- Contiguous memory allocation
- O(1) access time by index
- O(n) insertion/deletion

#### Linked Lists
- Dynamic size
- Non-contiguous memory
- O(n) access time
- O(1) insertion/deletion at known position

#### Stacks (LIFO)
- Last In, First Out principle
- Operations: push, pop, peek
- Use cases: function calls, undo operations

#### Queues (FIFO)
- First In, First Out principle
- Operations: enqueue, dequeue
- Use cases: task scheduling, BFS

### 2.2 Non-Linear Data Structures

#### Trees
- Hierarchical structure
- Root, nodes, leaves
- Binary trees, BST, AVL, B-trees

#### Graphs
- Nodes connected by edges
- Directed vs undirected
- Weighted vs unweighted

## 3. Key Takeaways

1. Choose data structures based on operation requirements
2. Consider time and space complexity trade-offs
3. Arrays for random access, linked lists for dynamic data
4. Trees for hierarchical data, graphs for relationships

## 4. Practice Questions

1. When would you use a stack over a queue?
2. Compare the time complexity of search operations in arrays vs binary search trees.
3. What data structure would you use to implement a web browser's back button?`;
  };

  const handleCopy = () => {
    if (generatedNote) {
      navigator.clipboard.writeText(generatedNote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setGeneratedNote(null);
    setSelectedCourse("");
    setSelectedUnits([]);
    setSelectedMethod("");
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Notes Generator</h1>
          <p className="text-muted-foreground">
            Transform your course materials into structured, effective notes
          </p>
        </div>

        {!generatedNote ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Configuration */}
            <div className="space-y-6">
              {/* Course Selection */}
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
                        onClick={() => {
                          setSelectedCourse(c.id);
                          setSelectedUnits([]);
                        }}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                          selectedCourse === c.id
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <span className="text-2xl block mb-2">{c.icon}</span>
                        <span className="font-medium text-sm block">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.units.length} units</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Unit Selection */}
              {course && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Units</CardTitle>
                    <CardDescription>Choose units to include in your notes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {course.units.map((unit) => (
                      <label
                        key={unit.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                          selectedUnits.includes(unit.id)
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <Checkbox
                          checked={selectedUnits.includes(unit.id)}
                          onCheckedChange={(checked) => {
                            setSelectedUnits((prev) =>
                              checked
                                ? [...prev, unit.id]
                                : prev.filter((id) => id !== unit.id)
                            );
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

            {/* Right: Method Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Note-Taking Method
                  </CardTitle>
                  <CardDescription>
                    Choose the methodology that works best for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {noteMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                        selectedMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{method.name}</h4>
                        {selectedMethod === method.id && (
                          <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {method.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">Best for:</span>
                        <span>{method.bestFor}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button
                className="w-full gradient-primary"
                size="lg"
                disabled={!selectedCourse || !selectedMethod || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Notes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Notes
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Actions Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{course?.name}</Badge>
                <Badge variant="outline">
                  {noteMethods.find((m) => m.id === selectedMethod)?.name}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Generate New
                </Button>
              </div>
            </div>

            {/* Generated Note */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedNote}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="/flashcards">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Flashcards
                </a>
              </Button>
              <Button className="gradient-primary" asChild>
                <a href="/exam">
                  Test Your Knowledge
                  <ChevronRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
