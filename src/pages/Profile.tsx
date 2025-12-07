import {
  User,
  Mail,
  Calendar,
  Clock,
  Trophy,
  Target,
  Flame,
  BookOpen,
  TrendingUp,
  Star,
  Award,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { studentProfile, courses, examResults } from "@/data/mockData";

export default function Profile() {
  const enrolledCourses = courses.filter((c) =>
    studentProfile.enrolledCourses.includes(c.id)
  );

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 gradient-primary" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              <div className="w-32 h-32 rounded-2xl bg-background border-4 border-background flex items-center justify-center shadow-lg">
                <div className="w-full h-full rounded-xl gradient-primary flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-foreground">
                    {studentProfile.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              <div className="flex-1 pb-4">
                <h1 className="text-2xl font-bold mb-1">{studentProfile.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {studentProfile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {studentProfile.academicYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(studentProfile.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{studentProfile.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-success/10 mx-auto mb-2 flex items-center justify-center">
                <Target className="w-6 h-6 text-success" />
              </div>
              <p className="text-2xl font-bold">{studentProfile.averageScore}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 mx-auto mb-2 flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-2xl font-bold">{studentProfile.totalStudyHours}h</p>
              <p className="text-xs text-muted-foreground">Study Hours</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 mx-auto mb-2 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl font-bold">{studentProfile.examsCompleted}</p>
              <p className="text-xs text-muted-foreground">Exams Done</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-warning/10 mx-auto mb-2 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <p className="text-2xl font-bold">{studentProfile.longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{course.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{course.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {course.units.length} units
                          </p>
                        </div>
                        <Badge variant="secondary">{course.progress}%</Badge>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exam History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {examResults.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center font-bold",
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
                            {new Date(exam.date).toLocaleDateString()} • {exam.timeTaken} mins
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {exam.improvement > 0 ? (
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{exam.improvement}%
                          </Badge>
                        ) : exam.improvement < 0 ? (
                          <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                            {exam.improvement}%
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-warning" />
                    <span className="font-medium text-sm">Learning Style</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {studentProfile.learningStyle}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Peak Performance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {studentProfile.peakPerformanceTime}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {studentProfile.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={cn(
                        "p-3 rounded-xl text-center transition-all",
                        achievement.unlockedAt
                          ? "bg-warning/10 border border-warning/20"
                          : "bg-muted/50 opacity-50"
                      )}
                    >
                      <span className="text-2xl block mb-1">{achievement.icon}</span>
                      <p className="text-xs font-medium truncate">{achievement.name}</p>
                      {achievement.progress && !achievement.unlockedAt && (
                        <Progress value={achievement.progress} className="h-1 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strong Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strongest Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Cell Biology", score: 88 },
                    { name: "Variables & Data Types", score: 85 },
                    { name: "Natural Selection", score: 78 },
                  ].map((topic) => (
                    <div key={topic.name} className="flex items-center justify-between">
                      <span className="text-sm">{topic.name}</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {topic.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
