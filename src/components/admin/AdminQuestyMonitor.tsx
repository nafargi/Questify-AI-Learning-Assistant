import { 
  MessageSquare, TrendingUp, AlertTriangle, ThumbsUp, ThumbsDown,
  Clock, Users, BarChart2, Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Queries Today", value: "34,567", change: "+12%", icon: MessageSquare },
  { label: "Avg. Response Time", value: "1.2s", change: "-8%", icon: Clock },
  { label: "Satisfaction Rate", value: "94.2%", change: "+2.1%", icon: ThumbsUp },
  { label: "Flagged Responses", value: "23", change: "-15%", icon: AlertTriangle },
];

const topTopics = [
  { topic: "Calculus & Derivatives", queries: 4567, percentage: 15 },
  { topic: "Organic Chemistry", queries: 3892, percentage: 13 },
  { topic: "Physics - Mechanics", queries: 3456, percentage: 11 },
  { topic: "Programming - Python", queries: 2987, percentage: 10 },
  { topic: "Biology - Cell Structure", queries: 2654, percentage: 9 },
  { topic: "Statistics", queries: 2345, percentage: 8 },
];

const recentConversations = [
  { 
    user: "Sarah C.", query: "Explain the chain rule in calculus",
    response: "The chain rule is used when...", rating: "positive",
    time: "2 min ago", topic: "Calculus"
  },
  { 
    user: "Marcus J.", query: "Why do cells need mitochondria?",
    response: "Mitochondria are essential for...", rating: "positive",
    time: "5 min ago", topic: "Biology"
  },
  { 
    user: "Emily R.", query: "What's the difference between arrays and lists?",
    response: "In programming, arrays and lists...", rating: "neutral",
    time: "8 min ago", topic: "Programming"
  },
  { 
    user: "David K.", query: "Help me with quantum mechanics",
    response: "Quantum mechanics describes...", rating: "negative",
    time: "12 min ago", topic: "Physics"
  },
];

const qualityMetrics = [
  { metric: "Accuracy", value: 96, status: "excellent" },
  { metric: "Relevance", value: 94, status: "excellent" },
  { metric: "Clarity", value: 91, status: "good" },
  { metric: "Completeness", value: 88, status: "good" },
  { metric: "Safety", value: 99, status: "excellent" },
];

const AdminQuestyMonitor = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Questy AI Monitoring</h1>
        <p className="text-slate-400">Track AI assistant performance, topics, and response quality</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <span className={`text-sm ${stat.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.change}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Topics */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-violet-400" />
            Top Query Topics
          </h3>
          <div className="space-y-4">
            {topTopics.map((topic, i) => (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">{topic.topic}</span>
                  <span className="text-slate-500 text-sm">{topic.queries.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={topic.percentage * 3} className="h-2 bg-slate-800 flex-1" />
                  <span className="text-slate-400 text-xs w-8">{topic.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quality Metrics */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-violet-400" />
            Response Quality
          </h3>
          <div className="space-y-5">
            {qualityMetrics.map((metric) => (
              <div key={metric.metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{metric.metric}</span>
                  <Badge className={
                    metric.status === "excellent" 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }>
                    {metric.value}%
                  </Badge>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2 bg-slate-800"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Conversations */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-violet-400" />
              Recent Queries
            </h3>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
              <Filter className="w-4 h-4 mr-1" /> Filter
            </Button>
          </div>
          <div className="space-y-4">
            {recentConversations.map((conv, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <span className="text-violet-300 text-xs font-medium">
                        {conv.user.split(" ")[0][0]}{conv.user.split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-200 text-sm font-medium">{conv.user}</p>
                      <p className="text-slate-500 text-xs">{conv.time}</p>
                    </div>
                  </div>
                  <div className={`p-1 rounded ${
                    conv.rating === "positive" ? "bg-emerald-500/20" :
                    conv.rating === "negative" ? "bg-red-500/20" : "bg-slate-700"
                  }`}>
                    {conv.rating === "positive" ? (
                      <ThumbsUp className="w-3 h-3 text-emerald-400" />
                    ) : conv.rating === "negative" ? (
                      <ThumbsDown className="w-3 h-3 text-red-400" />
                    ) : null}
                  </div>
                </div>
                <p className="text-slate-300 text-sm line-clamp-2">{conv.query}</p>
                <Badge variant="outline" className="mt-2 border-slate-700 text-slate-500 text-xs">
                  {conv.topic}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Misuse Alert */}
      <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">23 Potential Misuse Patterns Detected</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              AI has flagged queries that may indicate misuse patterns including exam cheating attempts, 
              off-topic requests, or attempts to bypass content filters. Review these to maintain platform integrity.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30">
                Review Flagged Queries
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800">
                Configure Detection Rules
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminQuestyMonitor;
