import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { weeklyPlan, studentProfile, courses } from "@/data/mockData";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

export default function Planner() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [plan, setPlan] = useState(weeklyPlan);

  const todayBlocks = plan.filter((block) => block.day === selectedDay);
  
  const toggleComplete = (blockId: string) => {
    setPlan((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, completed: !block.completed } : block
      )
    );
  };

  const completedToday = todayBlocks.filter((b) => b.completed).length;
  const totalToday = todayBlocks.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-destructive bg-destructive/5";
      case "medium":
        return "border-warning bg-warning/5";
      default:
        return "border-muted bg-muted/5";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return "📝";
      case "review":
        return "🔄";
      case "notes":
        return "📒";
      case "flashcards":
        return "⚡";
      default:
        return "📚";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Planner</h1>
            <p className="text-muted-foreground">
              Your personalized weekly study schedule
            </p>
          </div>
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Study Block
          </Button>
        </div>

        {/* Stats */}
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
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedToday}/{totalToday}</p>
                  <p className="text-xs text-muted-foreground">Today's Progress</p>
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
                  <p className="text-2xl font-bold">7:00 PM</p>
                  <p className="text-xs text-muted-foreground">Peak Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23h</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Day Selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Week View
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {days.map((day) => {
                const dayBlocks = plan.filter((b) => b.day === day);
                const completed = dayBlocks.filter((b) => b.completed).length;
                const isToday = day === "Monday"; // Simulated

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "w-full p-3 rounded-xl text-left transition-all flex items-center justify-between",
                      selectedDay === day
                        ? "gradient-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          isToday ? "bg-success" : "bg-muted-foreground/30"
                        )}
                      />
                      <span className="font-medium text-sm">{day}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        selectedDay === day && "bg-primary-foreground/20 text-primary-foreground"
                      )}
                    >
                      {completed}/{dayBlocks.length}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Day Schedule */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedDay}'s Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                {todayBlocks.length > 0 ? (
                  <div className="space-y-3">
                    {todayBlocks.map((block) => {
                      const course = courses.find((c) => c.id === block.courseId);
                      
                      return (
                        <div
                          key={block.id}
                          className={cn(
                            "p-4 rounded-xl border-l-4 transition-all",
                            getPriorityColor(block.priority),
                            block.completed && "opacity-60"
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => toggleComplete(block.id)}
                                className="mt-1"
                              >
                                {block.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getTypeIcon(block.type)}</span>
                                  <h4
                                    className={cn(
                                      "font-medium",
                                      block.completed && "line-through"
                                    )}
                                  >
                                    {block.topic}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <span>{course?.icon} {block.courseName}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {block.startTime} - {block.endTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  block.priority === "high"
                                    ? "border-destructive text-destructive"
                                    : block.priority === "medium"
                                    ? "border-warning text-warning"
                                    : "border-muted-foreground text-muted-foreground"
                                )}
                              >
                                {block.priority}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                Start
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">No study blocks scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add a study block to start planning your day
                    </p>
                    <Button className="gradient-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Study Block
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm">
                      <span className="font-medium">Optimal timing:</span> Based on your performance data, 
                      schedule your challenging topics (Algorithms, Linear Algebra) during your peak hours: 7-9 PM.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm">
                      <span className="font-medium">Focus recommendation:</span> You haven't reviewed 
                      Database Normalization in 5 days. Consider adding a 30-min review session.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
