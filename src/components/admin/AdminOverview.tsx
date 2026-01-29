import {
  Users, BookOpen, ClipboardText, FileText, ChatCircle,
  TrendUp, TrendDown, Minus, Pulse, Lightning, Brain, Target
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    label: "Total Users",
    value: "24,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "from-violet-500 to-purple-600"
  },
  {
    label: "Active Learners",
    value: "18,293",
    change: "+8.2%",
    trend: "up",
    icon: Pulse,
    color: "from-emerald-500 to-teal-600"
  },
  {
    label: "Exams Generated",
    value: "142,567",
    change: "+23.1%",
    trend: "up",
    icon: ClipboardText,
    color: "from-blue-500 to-cyan-600"
  },
  {
    label: "Notes Created",
    value: "89,234",
    change: "+15.7%",
    trend: "up",
    icon: FileText,
    color: "from-amber-500 to-orange-600"
  },
  {
    label: "AI Interactions",
    value: "1.2M",
    change: "+31.4%",
    trend: "up",
    icon: ChatCircle,
    color: "from-pink-500 to-rose-600"
  },
  {
    label: "Study Sessions",
    value: "56,789",
    change: "-2.3%",
    trend: "down",
    icon: BookOpen,
    color: "from-indigo-500 to-violet-600"
  },
];

const platformHealth = [
  { label: "System Uptime", value: 99.97, status: "excellent" },
  { label: "AI Response Time", value: 94, status: "good" },
  { label: "User Satisfaction", value: 92, status: "good" },
  { label: "Error Rate", value: 0.3, status: "excellent", inverted: true },
];

const recentActivity = [
  { action: "New user registered", user: "Sarah Chen", time: "2 min ago", type: "user" },
  { action: "Exam completed", user: "Marcus Johnson", time: "5 min ago", type: "exam" },
  { action: "AI config updated", user: "Admin", time: "12 min ago", type: "system" },
  { action: "Feedback submitted", user: "Emily Rodriguez", time: "18 min ago", type: "feedback" },
  { action: "Material uploaded", user: "David Kim", time: "23 min ago", type: "content" },
];

const AdminOverview = () => {
  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendUp className="w-4 h-4 text-emerald-400" />;
    if (trend === "down") return <TrendDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
        <p className="text-slate-400">Real-time snapshot of the Questify ecosystem</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-slate-900/50 border-slate-800 p-6 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendIcon trend={stat.trend} />
                  <span className={stat.trend === "up" ? "text-emerald-400 text-sm" : "text-red-400 text-sm"}>
                    {stat.change}
                  </span>
                  <span className="text-slate-500 text-sm">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Platform Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Health */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Lightning className="w-5 h-5 text-violet-400" />
            Platform Health
          </h3>
          <div className="space-y-6">
            {platformHealth.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">{metric.label}</span>
                  <span className={`text-sm font-medium ${metric.status === "excellent" ? "text-emerald-400" :
                      metric.status === "good" ? "text-blue-400" : "text-amber-400"
                    }`}>
                    {metric.inverted ? `${metric.value}%` : `${metric.value}%`}
                  </span>
                </div>
                <Progress
                  value={metric.inverted ? 100 - metric.value * 10 : metric.value}
                  className="h-2 bg-slate-800"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Pulse className="w-5 h-5 text-violet-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <div className={`w-2 h-2 rounded-full ${item.type === "user" ? "bg-violet-400" :
                    item.type === "exam" ? "bg-blue-400" :
                      item.type === "system" ? "bg-amber-400" :
                        item.type === "feedback" ? "bg-emerald-400" :
                          "bg-pink-400"
                  }`} />
                <div className="flex-1">
                  <p className="text-slate-200 text-sm">{item.action}</p>
                  <p className="text-slate-500 text-xs">{item.user}</p>
                </div>
                <span className="text-slate-500 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Intelligence Summary</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Platform engagement is up 18% this week. The most common weak points detected across users
              are in <span className="text-violet-300 font-medium">calculus derivatives</span> and
              <span className="text-violet-300 font-medium"> organic chemistry reactions</span>.
              Consider promoting relevant study techniques for these areas.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg text-sm font-medium hover:bg-violet-500/30 transition-all">
                View Full Report
              </button>
              <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-all">
                Configure Alerts
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminOverview;
