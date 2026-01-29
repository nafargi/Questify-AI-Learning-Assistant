import {
  ChartBar, TrendUp, TrendDown, Target, Brain,
  Users, BookOpen, ArrowUpRight, ArrowDownRight
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const commonWeakPoints = [
  { topic: "Calculus - Integration by Parts", users: 4567, severity: "high" },
  { topic: "Organic Chemistry - Reaction Mechanisms", users: 3892, severity: "high" },
  { topic: "Physics - Electromagnetic Induction", users: 3456, severity: "medium" },
  { topic: "Statistics - Hypothesis Testing", users: 2987, severity: "medium" },
  { topic: "Biology - Protein Synthesis", users: 2654, severity: "medium" },
  { topic: "Programming - Recursion", users: 2345, severity: "low" },
];

const confidenceTrends = [
  { subject: "Mathematics", avgConfidence: 62, improvement: 8 },
  { subject: "Science", avgConfidence: 58, improvement: 12 },
  { subject: "Computer Science", avgConfidence: 71, improvement: 5 },
  { subject: "Humanities", avgConfidence: 74, improvement: 3 },
  { subject: "Languages", avgConfidence: 68, improvement: 7 },
];

const studyPatterns = [
  { pattern: "Morning Learners (6AM-12PM)", percentage: 34, trend: "up" },
  { pattern: "Afternoon Learners (12PM-6PM)", percentage: 28, trend: "stable" },
  { pattern: "Evening Learners (6PM-12AM)", percentage: 31, trend: "up" },
  { pattern: "Night Owls (12AM-6AM)", percentage: 7, trend: "down" },
];

const improvementMetrics = [
  { metric: "Avg. Score Improvement", value: "+18%", period: "30 days", trend: "up" },
  { metric: "Weak Point Resolution", value: "67%", period: "30 days", trend: "up" },
  { metric: "Study Consistency", value: "4.2 days/week", period: "avg", trend: "stable" },
  { metric: "Time to Mastery", value: "-12%", period: "vs last month", trend: "up" },
];

const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics & Learning Insights</h1>
        <p className="text-slate-400">Aggregated analytics to guide product decisions and improvements</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {improvementMetrics.map((metric) => (
          <Card key={metric.metric} className="bg-slate-900/50 border-slate-800 p-5">
            <p className="text-slate-400 text-sm">{metric.metric}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              {metric.trend === "up" && <ArrowUpRight className="w-5 h-5 text-emerald-400" />}
              {metric.trend === "down" && <ArrowDownRight className="w-5 h-5 text-red-400" />}
            </div>
            <p className="text-slate-500 text-xs mt-1">{metric.period}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Weak Points */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-400" />
            Common Weak Points Across Users
          </h3>
          <div className="space-y-4">
            {commonWeakPoints.map((point, i) => (
              <div
                key={point.topic}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${point.severity === "high" ? "bg-red-500/20" :
                  point.severity === "medium" ? "bg-amber-500/20" : "bg-emerald-500/20"
                  }`}>
                  <span className={`font-bold ${point.severity === "high" ? "text-red-400" :
                    point.severity === "medium" ? "text-amber-400" : "text-emerald-400"
                    }`}>
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 font-medium">{point.topic}</p>
                  <p className="text-slate-500 text-sm">{point.users.toLocaleString()} users struggling</p>
                </div>
                <Badge className={
                  point.severity === "high" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    point.severity === "medium" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }>
                  {point.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Confidence Trends */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-violet-400" />
            Average Confidence by Subject
          </h3>
          <div className="space-y-5">
            {confidenceTrends.map((subject) => (
              <div key={subject.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{subject.avgConfidence}%</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      +{subject.improvement}%
                    </Badge>
                  </div>
                </div>
                <Progress value={subject.avgConfidence} className="h-2 bg-slate-800" />
              </div>
            ))}
          </div>
        </Card>

        {/* Study Patterns */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            Study Time Patterns
          </h3>
          <div className="space-y-4">
            {studyPatterns.map((pattern) => (
              <div
                key={pattern.pattern}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50"
              >
                <div className="flex-1">
                  <p className="text-slate-200 font-medium">{pattern.pattern}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={pattern.percentage * 2} className="h-2 bg-slate-700 w-32" />
                    <span className="text-slate-400 text-sm">{pattern.percentage}%</span>
                  </div>
                </div>
                {pattern.trend === "up" && (
                  <div className="flex items-center gap-1 text-emerald-400 text-sm">
                    <TrendUp className="w-4 h-4" /> Rising
                  </div>
                )}
                {pattern.trend === "down" && (
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <TrendDown className="w-4 h-4" /> Declining
                  </div>
                )}
                {pattern.trend === "stable" && (
                  <span className="text-slate-500 text-sm">Stable</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Engagement Overview */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-400" />
            Engagement Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <p className="text-slate-400 text-sm">Daily Active Users</p>
              <p className="text-2xl font-bold text-white mt-1">12,847</p>
              <p className="text-emerald-400 text-sm mt-1">+8.3% vs last week</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-slate-400 text-sm">Avg. Session Length</p>
              <p className="text-2xl font-bold text-white mt-1">24 min</p>
              <p className="text-emerald-400 text-sm mt-1">+3.2 min vs last week</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-slate-400 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-white mt-1">78.4%</p>
              <p className="text-emerald-400 text-sm mt-1">+5.1% vs last month</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-slate-400 text-sm">Return Rate</p>
              <p className="text-2xl font-bold text-white mt-1">67.2%</p>
              <p className="text-emerald-400 text-sm mt-1">+2.8% vs last month</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
