import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClockCounterClockwise,
  Calendar,
  Clock,
  Target,
  TrendUp,
  TrendDown,
  CaretRight,
  ArrowCounterClockwise,
  Brain,
  Warning,
  CheckCircle,
  XCircle,
  BookOpen,
  Lightbulb,
  ArrowLeft,
  FileText,
  ChartBar,
  Sparkle,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { examResults, courses, noteMethods } from "@/data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DetailedExam {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  difficulty: string;
  timeTaken: number;
  weakTopics: string[];
  strongTopics: string[];
  improvement: number;
  questions: {
    id: string;
    question: string;
    type: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    topic: string;
    explanation: string;
    whyWrong?: string;
    conceptTested?: string;
    intelligenceType?: string;
    materialReference?: string;
    howToFix?: string;
  }[];
}

// Enhanced mock exam history with deep analysis
const detailedExamHistory: DetailedExam[] = [
  {
    id: "exam1",
    courseId: "cs101",
    courseName: "Computer Science Fundamentals",
    date: "2024-01-15",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    difficulty: "medium",
    timeTaken: 35,
    weakTopics: ["Recursion", "Big O Notation"],
    strongTopics: ["Variables", "Control Flow", "Arrays"],
    improvement: 8,
    questions: [
      {
        id: "q1",
        question: "What is the time complexity of binary search?",
        type: "mcq",
        userAnswer: "O(n)",
        correctAnswer: "O(log n)",
        isCorrect: false,
        topic: "Big O Notation",
        explanation: "Binary search divides the search space in half with each step.",
        whyWrong: "You confused linear search (O(n)) with binary search. This is a common misconception. Linear search checks each element one by one, while binary search eliminates half of the remaining elements in each step by comparing with the middle element. This is why binary search requires a sorted array - it uses the ordering to make intelligent decisions about which half to search.",
        conceptTested: "Understanding of logarithmic time complexity and divide-and-conquer algorithms",
        intelligenceType: "Logical-Mathematical Intelligence - This question tests your ability to recognize patterns in how algorithms scale with input size",
        materialReference: "Chapter 3: Algorithm Analysis, Section 3.2 'Logarithmic Complexity' - The material explains that any algorithm that halves the problem size at each step has O(log n) complexity. Examples include binary search, balanced BST operations, and merge sort's divide step.",
        howToFix: "Practice calculating time complexity step-by-step. For binary search: with n elements, after 1 step you have n/2, after 2 steps n/4, after k steps n/2^k. When n/2^k = 1, k = log₂(n). Use the Mind Map note method to visualize different complexity classes and their growth rates.",
      },
      {
        id: "q2",
        question: "What is the base case in recursion?",
        type: "fill-blank",
        userAnswer: "loop",
        correctAnswer: "termination condition",
        isCorrect: false,
        topic: "Recursion",
        explanation: "The base case is the condition that stops the recursive calls.",
        whyWrong: "You associated recursion with loops, which shows a fundamental misunderstanding. While both achieve repetition, they work differently. Loops use iteration with explicit counters, while recursion uses function calls that must eventually terminate. The base case is what prevents infinite recursion - it's the 'exit door' that the function reaches when the problem is small enough to solve directly without further recursion.",
        conceptTested: "Understanding of recursive function structure and termination conditions",
        intelligenceType: "Abstract Reasoning - This tests your ability to understand self-referential concepts and the importance of boundary conditions",
        materialReference: "Chapter 4: Recursion Fundamentals, Section 4.1 'Anatomy of Recursive Functions' - Every recursive function has two parts: base case (when to stop) and recursive case (when to continue). The factorial example shows: base case is n=0 returning 1, recursive case is n*factorial(n-1).",
        howToFix: "Use the Feynman technique: try to explain recursion to a beginner. Draw the call stack for a simple recursive function like factorial(5). See how each call waits for the next, and how the base case finally returns a concrete value that 'unwinds' the stack. Practice with Cornell notes, dedicating the left column to base cases and right column to recursive cases.",
      },
      {
        id: "q3",
        question: "Arrays in most programming languages use zero-based indexing.",
        type: "true-false",
        userAnswer: "true",
        correctAnswer: "true",
        isCorrect: true,
        topic: "Arrays",
        explanation: "Most languages like C, Java, JavaScript, Python use 0-based indexing.",
      },
    ],
  },
  {
    id: "exam2",
    courseId: "cs101",
    courseName: "Computer Science Fundamentals",
    date: "2024-01-10",
    score: 77,
    totalQuestions: 25,
    correctAnswers: 19,
    difficulty: "hard",
    timeTaken: 45,
    weakTopics: ["Trees", "Graphs", "Normalization"],
    strongTopics: ["Linked Lists", "Stacks"],
    improvement: -3,
    questions: [
      {
        id: "q1",
        question: "What traversal order does a pre-order tree traversal follow?",
        type: "mcq",
        userAnswer: "Left, Right, Root",
        correctAnswer: "Root, Left, Right",
        isCorrect: false,
        topic: "Trees",
        explanation: "Pre-order the visits the root first, then left subtree, then right subtree.",
        whyWrong: "You described post-order traversal (Left, Right, Root) instead of pre-order. This is a common confusion because the naming convention isn't intuitive at first. The 'pre', 'in', and 'post' refer to WHEN the root is processed: PRE-order processes root BEFORE children, IN-order processes root IN BETWEEN left and right, POST-order processes root AFTER children.",
        conceptTested: "Understanding of tree traversal algorithms and their applications",
        intelligenceType: "Spatial Intelligence - This tests your ability to mentally navigate hierarchical structures and track position within them",
        materialReference: "Chapter 5: Tree Data Structures, Section 5.3 'Tree Traversals' - The mnemonic 'Pre means root First' helps remember. Pre-order is used for copying trees and prefix expressions, In-order gives sorted order in BST, Post-order is used for deletion and postfix expressions.",
        howToFix: "Draw a simple tree with 5-7 nodes. Manually trace through each traversal type, writing down the order you visit nodes. Create a Mind Map with the three traversals branching from 'Tree Traversal', each branch showing the order and a real-world use case. Practice with the Charting note method: columns for traversal type, order, and applications.",
      },
    ],
  },
  {
    id: "exam3",
    courseId: "math201",
    courseName: "Advanced Mathematics",
    date: "2024-01-12",
    score: 62,
    totalQuestions: 15,
    correctAnswers: 9,
    difficulty: "hard",
    timeTaken: 50,
    weakTopics: ["Linear Algebra", "Eigenvalues"],
    strongTopics: ["Derivatives", "Limits"],
    improvement: 5,
    questions: [
      {
        id: "q1",
        question: "Calculate the eigenvalues of matrix [[2,1],[0,3]]",
        type: "calculation",
        userAnswer: "1, 2",
        correctAnswer: "2, 3",
        isCorrect: false,
        topic: "Eigenvalues",
        explanation: "For a triangular matrix, eigenvalues are the diagonal elements.",
        whyWrong: "You didn't recognize that this is an upper triangular matrix, which has a special property: the eigenvalues are simply the diagonal entries. For general matrices, you'd use det(A - λI) = 0, but for triangular matrices, this simplifies immediately because the determinant is the product of diagonal entries: (2-λ)(3-λ) = 0, giving λ = 2 and λ = 3.",
        conceptTested: "Recognition of special matrix forms and their properties",
        intelligenceType: "Pattern Recognition - This tests your ability to identify special cases that simplify calculations",
        materialReference: "Chapter 7: Eigenvalues and Eigenvectors, Section 7.2 'Properties of Eigenvalues' - Theorem 7.3 states: 'For any triangular matrix (upper or lower), the eigenvalues are the entries on the main diagonal.' This is a powerful shortcut that saves significant calculation time.",
        howToFix: "Create a 'Quick Recognition' flashcard deck for special matrix types: diagonal, triangular, symmetric, orthogonal. For each type, list its special properties. Use the Charting method with matrix type, visual example, and key properties in columns. Practice identifying matrix types before attempting calculations.",
      },
    ],
  },
];

export default function ExamHistory() {
  const [selectedExam, setSelectedExam] = useState<DetailedExam | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail" | "analysis">("list");

  // Calculate overall stats
  const totalExams = detailedExamHistory.length;
  const averageScore = Math.round(
    detailedExamHistory.reduce((acc, e) => acc + e.score, 0) / totalExams
  );
  const totalTime = detailedExamHistory.reduce((acc, e) => acc + e.timeTaken, 0);

  // Performance trend data
  const performanceTrend = detailedExamHistory
    .slice()
    .reverse()
    .map((exam) => ({
      date: new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: exam.score,
      course: exam.courseName.split(" ")[0],
    }));

  const handleViewAnalysis = (exam: DetailedExam) => {
    setSelectedExam(exam);
    setViewMode("analysis");
  };

  const handleReExam = (examId: string) => {
    // Navigate to exam with pre-filled config
    window.location.href = `/exam?retake=${examId}`;
  };

  return (
    <DashboardLayout title="Exam History">
      {viewMode === "list" && (
        <div className="space-y-6 animate-fade-in">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                    <ClockCounterClockwise className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalExams}</p>
                    <p className="text-sm text-muted-foreground">Total Exams</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{averageScore}%</p>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalTime}m</p>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <TrendUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">+5%</p>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trend Chart (D3 Linear Style) */}
          <Card className="border shadow-none overflow-hidden">
            <CardHeader className="bg-muted/5 border-b py-4">
              <div className="flex justify-between items-end">
                <div>
                  <CardTitle className="text-sm font-black tracking-[0.2em] uppercase italic">D3 Linear: Performance Index</CardTitle>
                  <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">Long-term conceptual mastery tracking</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-none bg-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Score %</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-10">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card)/0.95)',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0px',
                        fontSize: '10px',
                        fontWeight: '900',
                        boxShadow: 'none',
                        backdropFilter: 'blur(4px)'
                      }}
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
                    />
                    <Line
                      type="linear"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 1.5 }}
                      activeDot={{ r: 5, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                      animationDuration={2000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Exam List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClockCounterClockwise className="w-5 h-5" />
                Past Exams
              </CardTitle>
              <CardDescription>Click on any exam to view detailed analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {detailedExamHistory.map((exam) => (
                <div
                  key={exam.id}
                  className="p-5 rounded-2xl border bg-card hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleViewAnalysis(exam)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl",
                          exam.score >= 80
                            ? "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600"
                            : exam.score >= 60
                              ? "bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-600"
                              : "bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 text-red-600"
                        )}
                      >
                        {exam.score}%
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{exam.courseName}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(exam.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.timeTaken} mins
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {exam.totalQuestions} questions
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exam.improvement > 0 ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          <TrendUp className="w-3 h-3 mr-1" />
                          +{exam.improvement}%
                        </Badge>
                      ) : exam.improvement < 0 ? (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          <TrendDown className="w-3 h-3 mr-1" />
                          {exam.improvement}%
                        </Badge>
                      ) : null}
                      <Badge
                        variant="outline"
                        className={cn(
                          exam.difficulty === "hard"
                            ? "border-destructive/50 text-destructive"
                            : exam.difficulty === "medium"
                              ? "border-warning/50 text-warning"
                              : "border-success/50 text-success"
                        )}
                      >
                        {exam.difficulty}
                      </Badge>
                      <CaretRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Correct</p>
                      <p className="text-lg font-semibold text-success">{exam.correctAnswers}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Incorrect</p>
                      <p className="text-lg font-semibold text-destructive">{exam.totalQuestions - exam.correctAnswers}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Weak Areas</p>
                      <p className="text-lg font-semibold">{exam.weakTopics.length}</p>
                    </div>
                  </div>

                  {/* Weak Topics */}
                  {exam.weakTopics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Needs improvement:</span>
                      {exam.weakTopics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="bg-destructive/10 text-destructive">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === "analysis" && selectedExam && (
        <div className="space-y-6 animate-fade-in">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setViewMode("list")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </Button>

          {/* Exam Header */}
          <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-3">{selectedExam.difficulty.toUpperCase()}</Badge>
                  <h1 className="text-2xl font-bold mb-2">{selectedExam.courseName}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedExam.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedExam.timeTaken} minutes
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "text-5xl font-bold",
                      selectedExam.score >= 80
                        ? "text-success"
                        : selectedExam.score >= 60
                          ? "text-warning"
                          : "text-destructive"
                    )}
                  >
                    {selectedExam.score}%
                  </div>
                  <p className="text-muted-foreground">
                    {selectedExam.correctAnswers}/{selectedExam.totalQuestions} correct
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button onClick={() => handleReExam(selectedExam.id)} className="gradient-primary">
              <ArrowCounterClockwise className="w-4 h-4 mr-2" />
              Re-take This Exam
            </Button>
            <Button variant="outline" asChild>
              <Link to="/notes">
                <BookOpen className="w-4 h-4 mr-2" />
                Generate Study Notes
              </Link>
            </Button>
          </div>

          {/* Weak Points Deep Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Warning className="w-5 h-5 text-warning" />
                Deep Weak Point Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive breakdown of areas that need improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedExam.questions
                .filter((q) => !q.isCorrect)
                .map((question, index) => (
                  <div
                    key={question.id}
                    className="p-6 rounded-2xl border border-destructive/20 bg-gradient-to-r from-destructive/5 via-background to-background"
                  >
                    {/* Question Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {question.type.toUpperCase()} • {question.topic}
                        </Badge>
                        <p className="font-medium text-lg">{question.question}</p>
                      </div>
                    </div>

                    {/* Answers Comparison */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-muted-foreground mb-1">Your Answer</p>
                        <p className="font-medium text-destructive">{question.userAnswer}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                        <p className="text-sm text-muted-foreground mb-1">Correct Answer</p>
                        <p className="font-medium text-success">{question.correctAnswer}</p>
                      </div>
                    </div>

                    {/* Deep Explanation Sections */}
                    <div className="space-y-4">
                      {/* Why You Got It Wrong */}
                      {question.whyWrong && (
                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                              <Warning className="w-4 h-4 text-destructive" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-destructive">
                                Why You Struggled
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.whyWrong}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Concept Tested */}
                      {question.conceptTested && (
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-primary">
                                Concept Being Tested
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.conceptTested}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Intelligence Type */}
                      {question.intelligenceType && (
                        <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                              <Sparkle className="w-4 h-4 text-secondary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-secondary">
                                Intelligence Type Required
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.intelligenceType}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Material Reference */}
                      {question.materialReference && (
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-accent">
                                From Your Material
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.materialReference}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* How to Fix */}
                      {question.howToFix && (
                        <div className="p-4 rounded-xl bg-success/5 border border-success/10">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-4 h-4 text-success" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-success">
                                How to Master This
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.howToFix}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Suggested Note Methods */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-3">Recommended Study Methods:</p>
                      <div className="flex flex-wrap gap-2">
                        {["cornell", "mind-map", "charting"].map((methodId) => {
                          const method = noteMethods.find((m) => m.id === methodId);
                          return method ? (
                            <Link
                              key={methodId}
                              to={`/notes?method=${methodId}`}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <span>{method.icon}</span>
                              <span className="text-sm font-medium">{method.name}</span>
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Correct Answers (Collapsed) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Questions You Got Right
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedExam.questions
                  .filter((q) => q.isCorrect)
                  .map((question) => (
                    <div
                      key={question.id}
                      className="p-4 rounded-xl bg-success/5 border border-success/10"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <div>
                          <Badge variant="secondary" className="mb-1 text-xs">
                            {question.topic}
                          </Badge>
                          <p className="text-sm">{question.question}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Overall Recommendations */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ChartBar className="w-5 h-5 text-primary" />
                AI Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl gradient-primary text-white">
                <h4 className="font-semibold mb-2">Key Takeaways</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Focus on understanding the "why" behind algorithms, not just memorizing steps</li>
                  <li>• Practice identifying special cases that allow shortcuts in calculations</li>
                  <li>• Use visual learning tools (Mind Maps) for hierarchical concepts like trees</li>
                  <li>• Schedule a re-exam in 3-5 days to reinforce corrected understanding</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-semibold text-sm mb-2">Strong Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExam.strongTopics.map((topic) => (
                      <Badge key={topic} className="bg-success/10 text-success">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-semibold text-sm mb-2">Priority Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExam.weakTopics.map((topic) => (
                      <Badge key={topic} className="bg-destructive/10 text-destructive">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
