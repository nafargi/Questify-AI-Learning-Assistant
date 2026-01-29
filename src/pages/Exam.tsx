import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  CaretRight,
  TrendUp,
  Target,
  RocketLaunch,
  Faders,
  Funnel,
  ChartBar,
  CheckCircle,
  Clock,
  Sparkle,
  Lightning,
  GraduationCap,
  ArrowRight
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses, questionTypes, studentProfile } from "@/data/mockData";
import { useExam } from "@/hooks/useExam";
import ExamRoom from "./ExamRoom";

export default function Exam() {
  const [step, setStep] = useState<"configure" | "exam">("configure");
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [config, setConfig] = useState({
    unitIds: [] as string[],
    questionTypes: ['mcq', 'true-false', 'fill-blank', 'matching', 'coding'],
    questionCount: 20,
    difficulty: 'mixed' as any,
    timeLimit: 30, // Default 30 minutes
  });

  const { questions, answers, setAnswer, timeLeft, isFinished, finishExam, results } = useExam({
    courseId: activeCourseId || '',
    unitIds: config.unitIds,
    questionTypes: config.questionTypes,
    difficulty: config.difficulty,
    count: config.questionCount,
    timeLimit: config.timeLimit,
  });

  const selectedCourse = courses.find((c) => c.id === activeCourseId);

  const handleStart = () => {
    if (!activeCourseId) return;
    setStep("exam");
  };

  if (step === "exam" && questions.length > 0) {
    return (
      <Layout showSidebar={false} title="Practice Exam">
        <ExamRoom
          questions={questions}
          answers={answers}
          onAnswer={setAnswer}
          timeLeft={timeLeft}
          isFinished={isFinished}
          onFinish={finishExam}
          results={results}
          onReset={() => setStep("configure")}
        />
      </Layout>
    );
  }

  return (
    <Layout title="Exam Room">
      <div className="container py-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exam Room</h1>
            <p className="text-muted-foreground mt-1">Configure and start your practice assessment</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{studentProfile.averageScore}%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Score</p>
            </div>
            <div className="h-10 w-px bg-border mx-2" />
            <div className="text-center">
              <p className="text-2xl font-bold">{studentProfile.examsCompleted}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Completed</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Course Selection */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold">Select a Course</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourseId(course.id)}
                    className={cn(
                      "group relative p-4 rounded-lg border transition-all duration-300 text-left",
                      activeCourseId === course.id
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "bg-card hover:bg-accent/50 border-border"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300",
                        activeCourseId === course.id ? "bg-primary text-primary-foreground scale-110" : "bg-muted group-hover:scale-110"
                      )}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{course.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      </div>
                      {activeCourseId === course.id && (
                        <CheckCircle className="w-6 h-6 text-primary absolute top-4 right-4" weight="fill" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Customization */}
            <section className={cn("transition-all duration-500", !activeCourseId && "opacity-50 pointer-events-none")}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                <h2 className="text-xl font-bold">Customize Assessment</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="rounded-lg border">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Select Units</CardTitle>
                    <Badge variant="secondary" className="rounded-full">{config.unitIds.length || 'All'} Selected</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedCourse?.units.map((unit) => (
                      <label
                        key={unit.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                          config.unitIds.includes(unit.id) ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-transparent hover:bg-muted/50"
                        )}
                      >
                        <Checkbox
                          checked={config.unitIds.includes(unit.id)}
                          onCheckedChange={(checked) => {
                            setConfig(prev => ({
                              ...prev,
                              unitIds: checked
                                ? [...prev.unitIds, unit.id]
                                : prev.unitIds.filter(id => id !== unit.id)
                            }));
                          }}
                        />
                        <span className="text-sm font-medium flex-1">{unit.title}</span>
                      </label>
                    ))}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="rounded-lg border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Questions</label>
                          <span className="text-lg font-bold">{config.questionCount}</span>
                        </div>
                        <Slider
                          value={[config.questionCount]}
                          onValueChange={([val]) => setConfig(p => ({ ...p, questionCount: val }))}
                          max={30} min={5} step={5}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Difficulty</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['easy', 'medium', 'hard', 'mixed'].map(level => (
                            <button
                              key={level}
                              onClick={() => setConfig(p => ({ ...p, difficulty: level as any }))}
                              className={cn(
                                "py-2 px-1 text-[10px] uppercase font-bold rounded-lg border transition-all",
                                config.difficulty === level
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                              )}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-4 rounded-2xl bg-muted/50 border ">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Question Types</p>
                    <div className="flex flex-wrap gap-2">
                      {questionTypes.map(t => (
                        <Badge
                          key={t.id}
                          variant={config.questionTypes.includes(t.id) ? "default" : "outline"}
                          className="cursor-pointer py-1 px-3 rounded-full transition-all"
                          onClick={() => setConfig(p => ({
                            ...p,
                            questionTypes: p.questionTypes.includes(t.id)
                              ? p.questionTypes.filter(id => id !== t.id)
                              : [...p.questionTypes, t.id]
                          }))}
                        >
                          {t.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <Card className="rounded-lg  border overflow-hidden glass-card">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <RocketLaunch className="w-6 h-6 text-primary" weight="fill" />
                    Launch Exam
                  </CardTitle>
                  <CardDescription>Review your configuration before initiating</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Course</span>
                      <span className="text-sm font-bold">{selectedCourse?.name || "Not Selected"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-muted/50 text-center">
                        <span className="text-xs text-muted-foreground block">Questions</span>
                        <span className="text-xl font-bold">{config.questionCount}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/50 text-center">
                        <span className="text-xs text-muted-foreground block">Time Limit</span>
                        <span className="text-xl font-bold">{Math.round(config.questionCount * 1.5)}m</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                    <Sparkle className="w-4 h-4 text-primary shrink-0 mt-0.5" weight="fill" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Questy AI will adapt the questions in real-time based on your performance.
                    </p>
                  </div>

                  <Button
                    className="w-full py-6 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95"
                    disabled={!activeCourseId || config.questionTypes.length === 0}
                    onClick={handleStart}
                  >
                    Start Assessment
                    <CaretRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-none shadow-sm bg-accent/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">AI Study Partner</p>
                    <p className="text-xs text-muted-foreground mt-1">Chat for quick revision</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <Link to="/questy-chat"><ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
