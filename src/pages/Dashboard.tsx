
import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Sparkle, Flame, Target, BookOpen, ArrowRight, TrendUp } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Simplified Stat Card
const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }: any) => (
  <div className="bg-card border rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
        <Icon className="w-5 h-5" weight="fill" />
      </div>
      {trend && (
        <Badge variant="secondary" className={cn("text-xs font-bold", trendUp ? "text-green-600 bg-green-500/10" : "text-red-600 bg-red-500/10")}>
          {trend}
        </Badge>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-black tracking-tight mb-1">{value}</h3>
      <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

// Focus Card (Action Oriented)
const FocusCard = ({ title, subtitle, action, imageGradient }: any) => (
  <div className="relative overflow-hidden rounded-3xl border bg-card p-8 group cursor-pointer hover:border-primary/50 transition-all">
    <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity", imageGradient)} />
    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
        {action} <ArrowRight />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <DashboardLayout title="Command Center">
      <div className="max-w-7xl mx-auto pb-20 space-y-12">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, Scholar.</h1>
            <p className="text-muted-foreground text-lg">Your cognitive index has increased by <span className="text-primary font-bold">+12%</span> this week.</p>
          </div>
          <Button className="rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">
            <Sparkle className="mr-2" weight="fill" />
            Resume Learning
          </Button>
        </div>

        {/* Core Metrics - Cleaner Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Target} label="Mastery" value="82%" trend="+2.4%" trendUp color="bg-primary/10 text-primary" />
          <StatCard icon={Flame} label="Streak" value="12 Days" trend="On Fire" trendUp color="bg-orange-500/10 text-orange-500" />
          <StatCard icon={BookOpen} label="Focus Time" value="4.2h" trend="Today" trendUp color="bg-blue-500/10 text-blue-500" />
          <StatCard icon={TrendUp} label="Retention" value="94%" trend="High" trendUp color="bg-purple-500/10 text-purple-500" />
        </div>

        {/* Action Grid - "What do you want to do?" */}
        <div className="grid md:grid-cols-2 gap-6">
          <FocusCard
            title="Study Session"
            subtitle="Enter the flow state. Access your active library and choose a cognitive protocol."
            action="Enter Study Room"
            imageGradient="bg-gradient-to-br from-blue-500 to-purple-500"
          />
          <FocusCard
            title="Simulation Exam"
            subtitle="Test your knowledge boundaries with adaptive testing."
            action="Start Exam"
            imageGradient="bg-gradient-to-br from-orange-500 to-red-500"
          />
        </div>

        {/* Brief Insights (Not heavy tables) */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold">Recommended Focus</h2>
            <div className="bg-card border rounded-2xl p-6 space-y-6">
              {/* Recommendation 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">01</div>
                <div className="flex-1">
                  <h4 className="font-bold">Advanced Algorithms</h4>
                  <p className="text-sm text-muted-foreground">High decay rate detected. Review suggested.</p>
                </div>
                <Button variant="secondary" size="sm">Review</Button>
              </div>
              {/* Recommendation 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">02</div>
                <div className="flex-1">
                  <h4 className="font-bold">Neural Networks</h4>
                  <p className="text-sm text-muted-foreground">Completion 85%. Finish the final module.</p>
                </div>
                <Button variant="secondary" size="sm">Continue</Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Week at a Glance</h2>
            <div className="bg-card border rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Mon</span>
                  <div className="h-2 w-24 bg-primary/20 rounded-full overflow-hidden"><div className="h-full w-[80%] bg-primary" /></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Tue</span>
                  <div className="h-2 w-24 bg-primary/20 rounded-full overflow-hidden"><div className="h-full w-[60%] bg-primary" /></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Wed</span>
                  <div className="h-2 w-24 bg-primary/20 rounded-full overflow-hidden"><div className="h-full w-[40%] bg-primary" /></div>
                </div>
                <div className="flex justify-between items-center text-sm opacity-50">
                  <span>Thu</span>
                  <div className="h-2 w-24 bg-muted rounded-full" />
                </div>
                <div className="flex justify-between items-center text-sm opacity-50">
                  <span>Fri</span>
                  <div className="h-2 w-24 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
