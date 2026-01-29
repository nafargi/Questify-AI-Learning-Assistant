import {
  Calendar, Gear, TrendUp, Target, Clock,
  CheckCircle, Warning, Users, ChartBar
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const plannerStats = [
  { label: "Active Study Plans", value: "18,234", change: "+12%" },
  { label: "Avg. Plan Completion", value: "73.4%", change: "+5.2%" },
  { label: "On-Track Users", value: "14,567", change: "+8.1%" },
  { label: "Plans Adjusted Today", value: "2,345", change: "+18%" },
];

const adaptiveRules = [
  {
    id: 1, name: "Performance-Based Adjustment", enabled: true,
    description: "Adjust study load based on exam performance trends"
  },
  {
    id: 2, name: "Weak Point Priority", enabled: true,
    description: "Automatically prioritize topics with lower confidence scores"
  },
  {
    id: 3, name: "Spaced Review Scheduling", enabled: true,
    description: "Schedule reviews at optimal intervals for retention"
  },
  {
    id: 4, name: "Deadline Awareness", enabled: true,
    description: "Increase intensity as exam dates approach"
  },
  {
    id: 5, name: "Burnout Prevention", enabled: true,
    description: "Reduce load when patterns indicate fatigue"
  },
  {
    id: 6, name: "Recovery Mode", enabled: false,
    description: "Lighter schedule after intensive study periods"
  },
];

const planOutcomes = [
  { outcome: "Improved by 20%+ on target topics", users: 8934, percentage: 49 },
  { outcome: "Completed all scheduled sessions", users: 6234, percentage: 34 },
  { outcome: "Ahead of schedule", users: 4567, percentage: 25 },
  { outcome: "Behind schedule (needs intervention)", users: 2345, percentage: 13 },
  { outcome: "Abandoned plan", users: 1234, percentage: 7 },
];

const AdminPlanner = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Planner & Recommendation Logic</h1>
        <p className="text-slate-400">Oversee adaptive study planning and recommendation systems</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {plannerStats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className="text-emerald-400 text-sm">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adaptive Rules */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Gear className="w-5 h-5 text-violet-400" />
            Adaptive Planning Rules
          </h3>
          <div className="space-y-4">
            {adaptiveRules.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-xl bg-slate-800/50 ${!rule.enabled && "opacity-60"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-slate-200 font-medium">{rule.name}</h4>
                  <Switch
                    checked={rule.enabled}
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>
                <p className="text-slate-500 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan Outcomes */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <ChartBar className="w-5 h-5 text-violet-400" />
            Plan Outcomes
          </h3>
          <div className="space-y-4">
            {planOutcomes.map((outcome) => (
              <div key={outcome.outcome} className="p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">{outcome.outcome}</span>
                  <span className="text-slate-400 text-sm">{outcome.users.toLocaleString()} users</span>
                </div>
                <Progress value={outcome.percentage * 2} className="h-2 bg-slate-700" />
              </div>
            ))}
          </div>
        </Card>

        {/* Algorithm Weights */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-400" />
            Recommendation Weights
          </h3>
          <div className="space-y-6">
            {[
              { label: "Performance History", value: 35 },
              { label: "Confidence Scores", value: 25 },
              { label: "Time Since Review", value: 20 },
              { label: "Topic Difficulty", value: 15 },
              { label: "User Preferences", value: 5 },
            ].map((weight) => (
              <div key={weight.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{weight.label}</span>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                    {weight.value}%
                  </Badge>
                </div>
                <Slider
                  defaultValue={[weight.value]}
                  max={100}
                  className="[&_[role=slider]]:bg-violet-500"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Timing Settings */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-400" />
            Timing Configuration
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Default Session Length</span>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  25 min
                </Badge>
              </div>
              <Slider
                defaultValue={[25]}
                max={120}
                min={10}
                step={5}
                className="[&_[role=slider]]:bg-violet-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Max Daily Study Time</span>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  4 hours
                </Badge>
              </div>
              <Slider
                defaultValue={[4]}
                max={8}
                min={1}
                className="[&_[role=slider]]:bg-violet-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Break Frequency</span>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  Every 50 min
                </Badge>
              </div>
              <Slider
                defaultValue={[50]}
                max={90}
                min={20}
                step={10}
                className="[&_[role=slider]]:bg-violet-500"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Fairness Notice */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Algorithm Fairness Check</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Last audit completed 2 days ago. The adaptive planning system is performing within
              expected fairness parameters. No significant bias detected across user segments.
              Next scheduled audit in 5 days.
            </p>
            <Button variant="outline" className="mt-4 bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
              View Audit Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminPlanner;
