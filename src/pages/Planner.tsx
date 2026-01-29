import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  Flame,
  Target,
  TrendUp,
  DotsThree,
  ArrowRight
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { weeklyPlan, studentProfile, courses } from "@/data/mockData";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high": return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
      case "medium": return { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" };
      default: return { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-12 max-w-7xl mx-auto space-y-12">

        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <Calendar weight="fill" /> Active Syllabus
            </div>
            <h1 className="text-4xl font-black tracking-tight">Structured Timeline</h1>
            <p className="text-muted-foreground max-w-xl">
              Your generated path to mastery. Adjusted daily based on your learning velocity.
            </p>
          </div>

          <Button className="h-12 px-6 rounded-full font-bold shadow-lg">
            <Plus className="mr-2" weight="bold" />
            Add Manual Block
          </Button>
        </div>

        {/* Dynamic Day Selector */}
        <div className="flex flex-wrap gap-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-6 py-3 rounded-xl font-bold transition-all border text-sm",
                selectedDay === day
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-card hover:bg-muted text-muted-foreground"
              )}
            >
              {day}
              {plan.filter(b => b.day === day && b.completed).length > 2 && (
                <span className="ml-2 inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline Column */}
          <div className="lg:col-span-2 space-y-8">
            {todayBlocks.length > 0 ? (
              <div className="relative border-l-2 border-muted/30 ml-4 space-y-8 py-2">
                {todayBlocks.map((block, index) => {
                  const course = courses.find(c => c.id === block.courseId);
                  const style = getPriorityStyles(block.priority);

                  return (
                    <div key={block.id} className="relative pl-8 group">
                      {/* Timeline Node */}
                      <div className={cn(
                        "absolute -left-2.5 top-0 w-5 h-5 rounded-full border-4 border-background transition-colors",
                        block.completed ? "bg-green-500" : "bg-muted-foreground/30 group-hover:bg-primary"
                      )} />

                      {/* Card */}
                      <div
                        onClick={() => toggleComplete(block.id)}
                        className={cn(
                          "p-6 rounded-2xl border bg-card transition-all cursor-pointer hover:shadow-md hover:border-primary/20",
                          block.completed && "opacity-50 grayscale"
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", style.bg, style.color)}>
                              {block.type === 'exam' ? <Target size={18} weight="fill" /> : <Clock size={18} weight="fill" />}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              {block.startTime} - {block.endTime}
                            </span>
                          </div>
                          <button className="text-muted-foreground hover:text-primary">
                            {block.completed ? <CheckCircle size={24} weight="fill" className="text-green-500" /> : <Circle size={24} />}
                          </button>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{block.topic}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{course?.name}</span>
                          <span>•</span>
                          <span className="capitalize">{block.type}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/10">
                <p className="text-muted-foreground font-medium">No schedule for {selectedDay}</p>
              </div>
            )}
          </div>

          {/* AI Insight Column */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target weight="fill" /> Daily Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black mb-2">4.5h</div>
                <p className="text-sm text-muted-foreground mb-4">Focused work scheduled for today.</p>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-primary rounded-full" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Suggestions</h3>
              {["Review 'Linear Algebra' notes (High Decay)", "Take a 5m break", "Prepare for tomorrow's Mock Exam"].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border bg-card text-sm font-medium flex gap-3 items-center group cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
