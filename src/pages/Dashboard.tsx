import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Flame,
  Brain,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import {
  courses,
  examResults,
  weakAreas,
  aiInsights,
  flashcards,
  studentProfile,
  studySessions,
} from "@/data/mockData";

// Performance Chart Component
function PerformanceChart() {
  const data = [65, 72, 68, 85, 78, 82, 88];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...data);

  return (
    <div className="h-48 flex items-end justify-between gap-2 px-2">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center gap-2 flex-1">
          <div
            className="w-full rounded-t-lg gradient-primary transition-all duration-500 hover:opacity-80"
            style={{
              height: `${(value / maxValue) * 100}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
          <span className="text-xs text-muted-foreground">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

// Topic Mastery Chart
function TopicMasteryChart() {
  const topics = [
    { name: "Variables", mastery: 92 },
    { name: "Data Structures", mastery: 68 },
    { name: "Algorithms", mastery: 55 },
    { name: "Databases", mastery: 42 },
    { name: "Recursion", mastery: 48 },
  ];

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div key={topic.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{topic.name}</span>
            <span className="text-muted-foreground">{topic.mastery}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                topic.mastery >= 80
                  ? "bg-success"
                  : topic.mastery >= 60
                  ? "bg-warning"
                  : "bg-destructive"
              )}
              style={{ width: `${topic.mastery}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "all">("week");

  const totalStudyTime = studySessions.reduce((acc, s) => acc + s.duration, 0);
  const averagePerformance =
    studySessions.filter((s) => s.performance).reduce((acc, s) => acc + (s.performance || 0), 0) /
    studySessions.filter((s) => s.performance).length;

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{studentProfile.name.split(" ")[0]}</span>
              </h1>
              <p className="text-muted-foreground">
                Here's your learning progress overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link to="/upload">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Upload Materials
                </Link>
              </Button>
              <Button asChild className="gradient-primary">
                <Link to="/exam">
                  <Brain className="w-4 h-4 mr-2" />
                  Start Exam
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studentProfile.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studentProfile.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.round(totalStudyTime / 60)}h</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studentProfile.examsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Exams Done</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Performance Overview</CardTitle>
                <div className="flex gap-1">
                  {(["week", "month", "all"] as const).map((tf) => (
                    <Button
                      key={tf}
                      variant={selectedTimeframe === tf ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedTimeframe(tf)}
                      className={selectedTimeframe === tf ? "gradient-primary" : ""}
                    >
                      {tf === "week" ? "Week" : tf === "month" ? "Month" : "All"}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Weak Areas
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/exam">
                    Practice Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {weakAreas.slice(0, 4).map((area) => (
                    <div
                      key={area.topic}
                      className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{area.topic}</h4>
                          <p className="text-xs text-muted-foreground">{area.courseName}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            area.accuracy < 40
                              ? "border-destructive text-destructive"
                              : "border-warning text-warning"
                          )}
                        >
                          {area.accuracy}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {area.mistakePattern}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Time Pressure: {area.timePressureImpact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Exams */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Exams</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {examResults.slice(0, 4).map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                            exam.score >= 80
                              ? "bg-success/10 text-success"
                              : exam.score >= 60
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          {exam.score}%
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{exam.courseName}</h4>
                          <p className="text-xs text-muted-foreground">
                            {exam.totalQuestions} questions • {exam.timeTaken} mins
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {exam.improvement > 0 ? (
                          <div className="flex items-center gap-1 text-success text-sm">
                            <TrendingUp className="w-4 h-4" />
                            +{exam.improvement}%
                          </div>
                        ) : exam.improvement < 0 ? (
                          <div className="flex items-center gap-1 text-destructive text-sm">
                            <TrendingDown className="w-4 h-4" />
                            {exam.improvement}%
                          </div>
                        ) : null}
                        <Badge variant="outline" className="text-xs">
                          {exam.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insight of the Day */}
            <Card className="relative overflow-hidden border-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="font-medium text-sm mb-2">{aiInsights[0].title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {aiInsights[0].description}
                  </p>
                  {aiInsights[0].actionable && (
                    <Button size="sm" className="w-full gradient-primary">
                      <Zap className="w-4 h-4 mr-2" />
                      {aiInsights[0].action}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Topic Mastery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topic Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <TopicMasteryChart />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/flashcards">
                    <Zap className="w-4 h-4 mr-2" />
                    Review Flashcards
                    <Badge variant="secondary" className="ml-auto">
                      {flashcards.filter((f) => !f.mastered).length} left
                    </Badge>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/notes">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Notes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/planner">
                    <Clock className="w-4 h-4 mr-2" />
                    View Study Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Courses Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{course.icon}</span>
                        <span className="text-sm font-medium">{course.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
