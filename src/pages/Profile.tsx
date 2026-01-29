import {
  User,
  Envelope,
  Calendar,
  Clock,
  Trophy,
  Target,
  Flame,
  BookOpen,
  TrendUp,
  Star,
  Medal,
  ChartBar,
  PencilSimple
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { studentProfile, courses, examResults } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) =>
    studentProfile.enrolledCourses.includes(c.id)
  );

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-12 max-w-6xl mx-auto space-y-8">
        {/* Clean Profile Header */}
        <div className="relative mb-12">
          <div className="h-48 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 w-full overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
          </div>

          <div className="px-8 flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
            <div className="w-32 h-32 rounded-3xl bg-background border-4 border-background shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary">
                {studentProfile.name.charAt(0)}
              </div>
            </div>

            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-black tracking-tight mb-2">{studentProfile.name}</h1>
              <div className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2"><Envelope weight="bold" /> {studentProfile.email}</span>
                <span className="flex items-center gap-2"><BookOpen weight="bold" /> {studentProfile.academicYear}</span>
                <span className="text-primary font-bold">Pro Member</span>
              </div>
            </div>

            <Button variant="outline" className="mb-2 rounded-full font-bold">
              <PencilSimple className="mr-2" /> Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Day Streak", val: "12", icon: Flame, color: "text-orange-500 bg-orange-500/10" },
            { label: "Avg Score", val: "89%", icon: Target, color: "text-blue-500 bg-blue-500/10" },
            { label: "Study Hours", val: "142h", icon: Clock, color: "text-purple-500 bg-purple-500/10" },
            { label: "Rank", val: "Top 5%", icon: Trophy, color: "text-yellow-500 bg-yellow-500/10" },
          ].map((s, i) => (
            <div key={i} className="bg-card border rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", s.color)}>
                <s.icon weight="fill" size={24} />
              </div>
              <div>
                <div className="text-2xl font-black">{s.val}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Courses & History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Active Courses</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="p-4 rounded-2xl border bg-muted/20 hover:bg-background hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-3xl group-hover:scale-110 transition-transform">{course.icon}</span>
                      <Badge variant="secondary" className="font-bold">{course.progress}%</Badge>
                    </div>
                    <h4 className="font-bold mb-1">{course.name}</h4>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold">Recent Exam History</h3>
              <div className="space-y-4">
                {examResults.map(exam => (
                  <div key={exam.id} className="flex items-center gap-4 p-4 rounded-2xl border hover:bg-muted/30 transition-colors">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm",
                      exam.score >= 90 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"
                    )}>
                      {exam.score}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{exam.courseName}</div>
                      <div className="text-xs text-muted-foreground">{new Date(exam.date).toLocaleDateString()} • {exam.timeTaken} mins</div>
                    </div>
                    {exam.improvement > 0 && (
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">+{exam.improvement}%</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Insights */}
          <div className="space-y-6">
            <div className="bg-card border rounded-3xl p-6 space-y-6">
              <h3 className="text-lg font-bold">Cognitive Profile</h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Learning Style</div>
                  <div className="font-black text-lg">{studentProfile.learningStyle}</div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/50">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Peak Hours</div>
                  <div className="font-bold">{studentProfile.peakPerformanceTime}</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Strong Concepts</div>
                <div className="flex flex-wrap gap-2">
                  {["Cell Biology", "React Hooks", "Calculus II"].map(t => (
                    <Badge key={t} variant="secondary" className="px-3 py-1">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
