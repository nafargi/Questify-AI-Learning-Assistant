import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Flame,
  Brain,
  BarChart3,
  Zap,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import {
  courses,
  examResults,
  weakAreas,
  aiInsights,
  flashcards,
  studentProfile,
  studySessions,
  performanceData,
  subjectPerformance,
  noteMethods,
} from "@/data/mockData";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Stat Card Component
function StatCard({
  icon: Icon,
  value,
  label,
  change,
  changeType,
  bgColor,
  iconColor,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  change?: string;
  changeType?: "up" | "down";
  bgColor: string;
  iconColor: string;
}) {
  return (
    <Card className="hover-lift overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center",
              bgColor
            )}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
          {change && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                changeType === "up"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {changeType === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Custom Tooltip for charts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === "Score" || entry.name === "score" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "all">("week");

  const totalStudyTime = studySessions.reduce((acc, s) => acc + s.duration, 0);

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--warning))",
    "hsl(var(--success))",
  ];

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Flame}
          value={studentProfile.currentStreak}
          label="Day Streak"
          change="+2 from last week"
          changeType="up"
          bgColor="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30"
          iconColor="text-orange-500"
        />
        <StatCard
          icon={Target}
          value={`${studentProfile.averageScore}%`}
          label="Average Score"
          change="+5% improvement"
          changeType="up"
          bgColor="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30"
          iconColor="text-green-500"
        />
        <StatCard
          icon={Clock}
          value={`${Math.round(totalStudyTime / 60)}h`}
          label="Study Time"
          change="+3h this week"
          changeType="up"
          bgColor="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
          iconColor="text-blue-500"
        />
        <StatCard
          icon={Award}
          value={studentProfile.examsCompleted}
          label="Exams Completed"
          change="+8 this month"
          changeType="up"
          bgColor="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
          iconColor="text-purple-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
                <p className="text-sm text-muted-foreground">Weekly score trends</p>
              </div>
              <div className="flex gap-1">
                {(["week", "month", "all"] as const).map((tf) => (
                  <Button
                    key={tf}
                    variant={selectedTimeframe === tf ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={cn(
                      "text-xs",
                      selectedTimeframe === tf && "gradient-primary"
                    )}
                  >
                    {tf === "week" ? "Week" : tf === "month" ? "Month" : "All"}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      name="Score"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Two Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Subject Performance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subject Performance</CardTitle>
                <p className="text-sm text-muted-foreground">Score by subject</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis type="category" dataKey="subject" width={100} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="score" radius={[0, 8, 8, 0]} name="Score">
                        {subjectPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Study Distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Study Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Time per activity</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Exams", value: 35 },
                          { name: "Flashcards", value: 25 },
                          { name: "Notes", value: 20 },
                          { name: "Review", value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weak Areas with Deep Explanations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-destructive" />
                  Areas Needing Attention
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Deep analysis of your weak points
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {weakAreas.slice(0, 3).map((area) => (
                <div
                  key={area.topic}
                  className="p-5 rounded-2xl bg-gradient-to-r from-destructive/5 via-background to-background border border-destructive/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-base">{area.topic}</h4>
                      <p className="text-xs text-muted-foreground">{area.courseName}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-sm font-bold",
                        area.accuracy < 40
                          ? "border-destructive text-destructive bg-destructive/10"
                          : "border-warning text-warning bg-warning/10"
                      )}
                    >
                      {area.accuracy}% accuracy
                    </Badge>
                  </div>

                  {/* Why You're Struggling */}
                  <div className="mb-3 p-3 rounded-xl bg-muted/50">
                    <p className="text-xs font-semibold text-destructive mb-1">
                      Why You're Struggling
                    </p>
                    <p className="text-sm text-muted-foreground">{area.whyStruggling}</p>
                  </div>

                  {/* How to Fix */}
                  <div className="mb-3 p-3 rounded-xl bg-success/5 border border-success/10">
                    <p className="text-xs font-semibold text-success mb-1">
                      How to Fix This
                    </p>
                    <p className="text-sm text-muted-foreground">{area.howToFix}</p>
                  </div>

                  {/* Suggested Study Methods */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground">
                      Recommended note methods:
                    </span>
                    {area.suggestedNoteMethods.map((methodId) => {
                      const method = noteMethods.find((m) => m.id === methodId);
                      return method ? (
                        <Link
                          key={methodId}
                          to={`/notes?method=${methodId}`}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {method.icon} {method.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Exams */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Recent Exams</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
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
                          "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg",
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
                        <h4 className="font-medium">{exam.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exam.totalQuestions} questions • {exam.timeTaken} mins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exam.improvement > 0 ? (
                        <div className="flex items-center gap-1 text-success text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          +{exam.improvement}%
                        </div>
                      ) : exam.improvement < 0 ? (
                        <div className="flex items-center gap-1 text-destructive text-sm font-medium">
                          <TrendingDown className="w-4 h-4" />
                          {exam.improvement}%
                        </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* AI Insight Card */}
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
            <CardHeader className="relative">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                AI Insight of the Day
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10">
                <h4 className="font-semibold text-sm mb-2">{aiInsights[0].title}</h4>
                <p className="text-sm text-muted-foreground mb-4">
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
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Topic Mastery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Variables & Types", mastery: 92, color: "bg-success" },
                { name: "Data Structures", mastery: 68, color: "bg-primary" },
                { name: "Algorithms", mastery: 55, color: "bg-warning" },
                { name: "Databases", mastery: 42, color: "bg-destructive" },
                { name: "Recursion", mastery: 48, color: "bg-secondary" },
              ].map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{topic.name}</span>
                    <span
                      className={cn(
                        "font-semibold",
                        topic.mastery >= 80
                          ? "text-success"
                          : topic.mastery >= 60
                          ? "text-primary"
                          : topic.mastery >= 50
                          ? "text-warning"
                          : "text-destructive"
                      )}
                    >
                      {topic.mastery}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-700", topic.color)}
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start group" asChild>
                <Link to="/exam">
                  <Brain className="w-4 h-4 mr-3 text-primary" />
                  Start Smart Exam
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start group" asChild>
                <Link to="/flashcards">
                  <Zap className="w-4 h-4 mr-3 text-warning" />
                  Review Flashcards
                  <Badge variant="secondary" className="ml-auto">
                    {flashcards.filter((f) => !f.mastered).length} left
                  </Badge>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start group" asChild>
                <Link to="/notes">
                  <BookOpen className="w-4 h-4 mr-3 text-secondary" />
                  Generate Notes
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start group" asChild>
                <Link to="/planner">
                  <Clock className="w-4 h-4 mr-3 text-accent" />
                  View Study Plan
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Courses Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{course.icon}</span>
                      <span className="text-sm font-medium truncate max-w-[140px]">
                        {course.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
