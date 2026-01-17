import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  ChevronRight,
  TrendingUp,
  Target,
  Rocket,
  Settings2,
  ListFilter,
  BarChart4,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { courses, questionTypes } from "@/data/mockData";
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
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-12 bg-background/50 selection:bg-primary/20">
        <div className="max-w-7xl mx-auto animate-fade-in space-y-12">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border/50">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1  bg-primary/10 text-primary border border-primary/20">
                <Zap className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">Examination Protocol v2.4</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground">
                Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Center</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Configure your assessment parameters. The AI engine will generate a tailored examination sequence based on your selections.
              </p>
            </div>

            <div className="flex gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border border-white/5 w-40 hover:bg-card/80 transition-colors">
                <div className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2  bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-black">98<span className="text-sm">%</span></p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Accuracy</p>
                </div>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border border-white/5 w-40 hover:bg-card/80 transition-colors">
                <div className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2  bg-purple-500/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-black">12</p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Sessions</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left: Configuration Steps */}
            <div className="lg:col-span-8 space-y-10">

              {/* Step 1: Course Selection */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">1</div>
                  <h2 className="text-3xl font-bold text-foreground tracking-tight">Select Discipline</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setActiveCourseId(course.id)}
                      className={cn(
                        "group relative p-6  border transition-all duration-300 overflow-hidden text-left",
                        activeCourseId === course.id
                          ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10 ring-1 ring-primary/20 scale-[1.02]"
                          : "border-border bg-card/50 hover:border-primary/30 hover:bg-card hover:scale-[1.01]"
                      )}
                    >
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity",
                        activeCourseId === course.id ? "opacity-100" : "group-hover:opacity-100"
                      )} />

                      <div className="relative z-10 flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500",
                          activeCourseId === course.id ? "bg-primary text-white scale-110 rotate-3" : "bg-muted group-hover:scale-110"
                        )}>
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{course.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>
                        </div>
                        {activeCourseId === course.id && (
                          <div className="absolute top-4 right-4 text-primary">
                            <CheckCircle2 className="w-6 h-6 fill-primary/20" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 2: Customization (only if course selected) */}
              <section className={cn("transition-all duration-700", !activeCourseId ? "opacity-30 pointer-events-none blur-sm" : "opacity-100")}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg border border-border">2</div>
                  <h2 className="text-3xl font-bold text-foreground tracking-tight">Calibration</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Units */}
                  <Card className="border shadow-none bg-card/30 hover:bg-card/50 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ListFilter className="w-5 h-5 text-primary" />
                          <CardTitle className="text-base uppercase tracking-wider font-bold">Targeted Units</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{config.unitIds.length || 'All'} Selected</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedCourse?.units.map((unit) => (
                        <label
                          key={unit.id}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all",
                            config.unitIds.includes(unit.id)
                              ? "border-primary/50 bg-primary/5 shadow-inner"
                              : "border-border/50 hover:bg-muted/50"
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
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className="text-sm font-medium flex-1">{unit.title}</span>
                          <span className={cn(
                            "w-1.5 h-1.5 ",
                            unit.mastery > 80 ? "bg-green-500" : unit.mastery > 50 ? "bg-yellow-500" : "bg-red-500"
                          )} />
                        </label>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Settings */}
                  <div className="space-y-6">
                    <Card className="border shadow-none bg-card/30 overflow-hidden">
                      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
                        <div className="flex items-center gap-2">
                          <Settings2 className="w-5 h-5 text-primary" />
                          <CardTitle className="text-base uppercase tracking-wider font-bold">Intensity</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-8">
                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Load</p>
                            <span className="text-xl font-black text-foreground">{config.questionCount} <span className="text-xs text-muted-foreground font-medium">Questions</span></span>
                          </div>
                          <Slider
                            value={[config.questionCount]}
                            onValueChange={([val]) => setConfig(p => ({ ...p, questionCount: val }))}
                            max={30} min={5} step={5}
                            className="[&>.absolute]:bg-primary"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Complexity</p>
                            <span className="text-xl font-black text-foreground">
                              {config.difficulty === 'mixed' ? 'Adaptive' : config.difficulty}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {['easy', 'medium', 'hard', 'mixed'].map(level => (
                              <button
                                key={level}
                                onClick={() => setConfig(p => ({ ...p, difficulty: level as any }))}
                                className={cn(
                                  "flex-1 py-2 text-[10px] uppercase font-bold rounded-lg border transition-all",
                                  config.difficulty === level
                                    ? "bg-primary text-white border-primary"
                                    : "bg-background hover:bg-muted"
                                )}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5">
                      <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-3">Methods</p>
                      <div className="flex flex-wrap gap-2">
                        {questionTypes.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setConfig(p => ({
                              ...p,
                              questionTypes: p.questionTypes.includes(t.id)
                                ? p.questionTypes.filter(id => id !== t.id)
                                : [...p.questionTypes, t.id]
                            }))}
                            className={cn(
                              "px-3 py-1.5  text-[10px] font-bold border transition-all",
                              config.questionTypes.includes(t.id)
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-muted-foreground hover:border-foreground/50"
                            )}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Summary & Action */}
            <div className="lg:col-span-4 ">
              <div className="sticky top-12 space-y-6 ">
                <Card className="relative overflow-hidden rounded-[0px] bg-gradient-to-b from-card to-background ring-1 ring-white/10   border-border">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10  blur-3xl -mr-32 -mt-32 pointer-events-none" />

                  <CardHeader className="border-b border-border/50 pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 rounded-lg bg-primary text-white">
                        <Rocket className="w-5 h-5" />
                      </div>
                      Ready to Launch
                    </CardTitle>
                    <CardDescription>
                      Review your configuration before initializing the sequence.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 
                       bg-muted/30">
                        <span className="text-sm text-muted-foreground">Discipline</span>
                        <span className="text-sm font-bold text-foreground text-right">{selectedCourse?.name || "Pending Selection"}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 
                         bg-muted/30">
                          <span className="text-xs text-muted-foreground block mb-1">Items</span>
                          <span className="text-lg font-black text-foreground">{config.questionCount}</span>
                        </div>
                        <div className="p-3 
                         bg-muted/30">
                          <span className="text-xs text-muted-foreground block mb-1">Est. Time</span>
                          <span className="text-lg font-black text-foreground">{Math.round(config.questionCount * 1.5)}m</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
                      <p className="text-xs text-orange-200/80 leading-relaxed font-medium">
                        The AI will adapt question difficulty in real-time based on your performance.
                      </p>
                    </div>

                    <Button
                      className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 rounded-xl group transition-all"
                      disabled={!activeCourseId || config.questionTypes.length === 0}
                      onClick={handleStart}
                    >
                      <span className="mr-2">Initiate Sequence</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
