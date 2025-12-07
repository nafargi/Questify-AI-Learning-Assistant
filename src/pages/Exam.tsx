import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Clock,
  ChevronRight,
  ChevronLeft,
  Flag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Play,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses, sampleQuestions } from "@/data/mockData";

type ExamStep = "configure" | "exam" | "results";

interface ExamConfig {
  courseId: string;
  unitIds: string[];
  questionTypes: string[];
  difficulty: number;
  questionCount: number;
}

interface ExamQuestion {
  id: string;
  question: string;
  type: string;
  options?: string[];
  userAnswer?: string;
  correctAnswer: string;
  isCorrect?: boolean;
  timeSpent: number;
  flagged: boolean;
}

const questionTypes = [
  { id: "mcq", label: "Multiple Choice", icon: "🔘" },
  { id: "true-false", label: "True/False", icon: "✓✗" },
  { id: "fill-blank", label: "Fill in the Blank", icon: "___" },
  { id: "matching", label: "Matching", icon: "🔗" },
  { id: "short-answer", label: "Short Answer", icon: "📝" },
  { id: "coding", label: "Coding", icon: "💻" },
];

export default function Exam() {
  const [step, setStep] = useState<ExamStep>("configure");
  const [config, setConfig] = useState<ExamConfig>({
    courseId: "",
    unitIds: [],
    questionTypes: ["mcq"],
    difficulty: 50,
    questionCount: 10,
  });
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStartTime] = useState<number>(0);

  const selectedCourse = courses.find((c) => c.id === config.courseId);

  const handleStartExam = () => {
    // Generate questions based on config
    const generatedQuestions: ExamQuestion[] = sampleQuestions
      .filter((q) => config.questionTypes.includes(q.type))
      .slice(0, config.questionCount)
      .map((q) => ({
        id: q.id,
        question: q.question,
        type: q.type,
        options: q.options,
        correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer,
        timeSpent: 0,
        flagged: false,
      }));

    setQuestions(generatedQuestions);
    setTimeRemaining(config.questionCount * 60); // 1 minute per question
    setStep("exam");
  };

  const handleAnswer = (answer: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === currentQuestion
          ? { ...q, userAnswer: answer, isCorrect: answer === q.correctAnswer }
          : q
      )
    );
  };

  const handleFlag = () => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === currentQuestion ? { ...q, flagged: !q.flagged } : q
      )
    );
  };

  const handleFinish = () => {
    setStep("results");
  };

  const score = questions.filter((q) => q.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8">
        {/* Configure Step */}
        {step === "configure" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Configure Your Exam</h1>
              <p className="text-muted-foreground">
                Customize your exam settings for the best learning experience
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Course Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {courses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => setConfig((prev) => ({ ...prev, courseId: course.id, unitIds: [] }))}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                            config.courseId === course.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <span className="text-2xl block mb-2">{course.icon}</span>
                          <span className="font-medium text-sm">{course.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Unit Selection */}
                {selectedCourse && (
                  <Card className="animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-lg">Select Units</CardTitle>
                      <CardDescription>Choose specific units to focus on</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCourse.units.map((unit) => (
                          <label
                            key={unit.id}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                              config.unitIds.includes(unit.id)
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            )}
                          >
                            <Checkbox
                              checked={config.unitIds.includes(unit.id)}
                              onCheckedChange={(checked) => {
                                setConfig((prev) => ({
                                  ...prev,
                                  unitIds: checked
                                    ? [...prev.unitIds, unit.id]
                                    : prev.unitIds.filter((id) => id !== unit.id),
                                }));
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
                    </CardContent>
                  </Card>
                )}

                {/* Question Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Question Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {questionTypes.map((type) => (
                        <label
                          key={type.id}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                            config.questionTypes.includes(type.id)
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <Checkbox
                            checked={config.questionTypes.includes(type.id)}
                            onCheckedChange={(checked) => {
                              setConfig((prev) => ({
                                ...prev,
                                questionTypes: checked
                                  ? [...prev.questionTypes, type.id]
                                  : prev.questionTypes.filter((t) => t !== type.id),
                              }));
                            }}
                          />
                          <span className="text-lg">{type.icon}</span>
                          <span className="font-medium text-sm">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Difficulty & Count */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exam Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Difficulty Level</Label>
                        <Badge variant="outline">
                          {config.difficulty < 40 ? "Easy" : config.difficulty < 70 ? "Medium" : "Hard"}
                        </Badge>
                      </div>
                      <Slider
                        value={[config.difficulty]}
                        onValueChange={([value]) => setConfig((prev) => ({ ...prev, difficulty: value }))}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Number of Questions</Label>
                        <Badge variant="outline">{config.questionCount} questions</Badge>
                      </div>
                      <Slider
                        value={[config.questionCount]}
                        onValueChange={([value]) => setConfig((prev) => ({ ...prev, questionCount: value }))}
                        min={5}
                        max={50}
                        step={5}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Preview */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Exam Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Course</span>
                        <span className="font-medium">
                          {selectedCourse?.name || "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Units</span>
                        <span className="font-medium">
                          {config.unitIds.length || "All"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Questions</span>
                        <span className="font-medium">{config.questionCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Time</span>
                        <span className="font-medium">{config.questionCount} mins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Difficulty</span>
                        <span className="font-medium">
                          {config.difficulty < 40 ? "Easy" : config.difficulty < 70 ? "Medium" : "Hard"}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full gradient-primary"
                      size="lg"
                      disabled={!config.courseId || config.questionTypes.length === 0}
                      onClick={handleStartExam}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Exam
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Exam Step */}
        {step === "exam" && questions.length > 0 && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                {questions[currentQuestion].flagged && (
                  <Badge variant="secondary" className="gap-1">
                    <Flag className="w-3 h-3" />
                    Flagged
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-lg">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Progress */}
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="h-2 mb-8"
            />

            {/* Question Card */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4">
                  {questions[currentQuestion].type.toUpperCase()}
                </Badge>
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                {/* MCQ Options */}
                {questions[currentQuestion].options && (
                  <RadioGroup
                    value={questions[currentQuestion].userAnswer}
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                          questions[currentQuestion].userAnswer === option
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <RadioGroupItem value={option} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {/* Question Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" onClick={handleFlag}>
                  <Flag className={cn("w-4 h-4 mr-2", questions[currentQuestion].flagged && "fill-current")} />
                  {questions[currentQuestion].flagged ? "Unflag" : "Flag"}
                </Button>
              </div>

              <div className="flex gap-2">
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                    className="gradient-primary"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleFinish} className="gradient-primary">
                    Finish Exam
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Question Navigator */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                        currentQuestion === index
                          ? "gradient-primary text-primary-foreground"
                          : q.userAnswer
                          ? "bg-success/10 text-success border border-success/20"
                          : q.flagged
                          ? "bg-warning/10 text-warning border border-warning/20"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Step */}
        {step === "results" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <div
                className={cn(
                  "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
                  percentage >= 80
                    ? "bg-success/10"
                    : percentage >= 60
                    ? "bg-warning/10"
                    : "bg-destructive/10"
                )}
              >
                {percentage >= 80 ? (
                  <CheckCircle2 className="w-12 h-12 text-success" />
                ) : percentage >= 60 ? (
                  <AlertTriangle className="w-12 h-12 text-warning" />
                ) : (
                  <XCircle className="w-12 h-12 text-destructive" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">Exam Complete!</h1>
              <p className="text-muted-foreground">
                Here's how you performed
              </p>
            </div>

            {/* Score Card */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div
                      className={cn(
                        "text-5xl font-bold mb-2",
                        percentage >= 80
                          ? "text-success"
                          : percentage >= 60
                          ? "text-warning"
                          : "text-destructive"
                      )}
                    >
                      {percentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-2 text-success">{score}</div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-2 text-destructive">
                      {questions.length - score}
                    </div>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold mb-2">{questions.length}</div>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Question Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className={cn(
                      "p-4 rounded-xl border",
                      q.isCorrect ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          q.isCorrect ? "bg-success/10" : "bg-destructive/10"
                        )}
                      >
                        {q.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-2">
                          {index + 1}. {q.question}
                        </p>
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="text-muted-foreground">Your answer: </span>
                            <span className={q.isCorrect ? "text-success" : "text-destructive"}>
                              {q.userAnswer || "Not answered"}
                            </span>
                          </p>
                          {!q.isCorrect && (
                            <p>
                              <span className="text-muted-foreground">Correct answer: </span>
                              <span className="text-success">{q.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="mb-6 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Focus Area Detected</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your answers, you should review Data Structures and Algorithms concepts.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Improvement Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        Your time management was good. Try to spend more time on flagged questions in future exams.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setStep("configure")}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Another Exam
              </Button>
              <Button asChild variant="outline">
                <Link to="/notes">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Generate Study Notes
                </Link>
              </Button>
              <Button asChild className="gradient-primary">
                <Link to="/dashboard">
                  <Brain className="w-4 h-4 mr-2" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
