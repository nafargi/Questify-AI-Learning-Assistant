import { 
  MessageCircle, Star, ThumbsUp, ThumbsDown, Filter,
  CheckCircle, Clock, AlertCircle, TrendingUp, Search
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const feedbackStats = [
  { label: "Total Feedback", value: "8,234", change: "+12%", icon: MessageCircle },
  { label: "Avg. Rating", value: "4.6/5", change: "+0.2", icon: Star },
  { label: "Open Issues", value: "127", change: "-8%", icon: AlertCircle },
  { label: "Response Rate", value: "94%", change: "+3%", icon: CheckCircle },
];

const feedbackItems = [
  { 
    id: 1, type: "feature", title: "Add dark mode for notes",
    description: "Would love to have a dark mode option when studying at night.",
    user: "Sarah Chen", rating: 4, votes: 234, status: "planned",
    time: "2 hours ago"
  },
  { 
    id: 2, type: "bug", title: "Exam timer not saving progress",
    description: "When I refresh the page during an exam, my timer resets to zero.",
    user: "Marcus Johnson", rating: null, votes: 89, status: "in-progress",
    time: "5 hours ago"
  },
  { 
    id: 3, type: "improvement", title: "Better mobile experience",
    description: "The mobile app needs better touch controls for the study room.",
    user: "Emily Rodriguez", rating: 3, votes: 156, status: "under-review",
    time: "1 day ago"
  },
  { 
    id: 4, type: "feature", title: "Group study sessions",
    description: "Allow multiple users to join the same study room and collaborate.",
    user: "David Kim", rating: 5, votes: 567, status: "planned",
    time: "2 days ago"
  },
  { 
    id: 5, type: "praise", title: "Amazing AI explanations!",
    description: "Questy helped me finally understand calculus derivatives. Thank you!",
    user: "Lisa Wang", rating: 5, votes: 45, status: "acknowledged",
    time: "3 days ago"
  },
];

const categoryBreakdown = [
  { category: "Feature Requests", count: 3456, percentage: 42 },
  { category: "Bug Reports", count: 1234, percentage: 15 },
  { category: "Improvements", count: 2345, percentage: 28 },
  { category: "Praise", count: 1199, percentage: 15 },
];

const AdminFeedback = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      case "bug": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "improvement": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "praise": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned": return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      case "in-progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "under-review": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "acknowledged": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Feedback & Continuous Improvement</h1>
        <p className="text-slate-400">Review user feedback, issues, and feature requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {feedbackStats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <span className="text-emerald-400 text-sm">{stat.change}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            Feedback Categories
          </h3>
          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">{cat.category}</span>
                  <span className="text-slate-400 text-sm">{cat.count.toLocaleString()}</span>
                </div>
                <Progress value={cat.percentage * 2} className="h-2 bg-slate-800" />
              </div>
            ))}
          </div>
        </Card>

        {/* Feedback List */}
        <Card className="bg-slate-900/50 border-slate-800 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-violet-400" />
              Recent Feedback
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                />
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
                <Filter className="w-4 h-4 mr-1" /> Filter
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {feedbackItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <h4 className="text-slate-200 font-medium">{item.title}</h4>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace("-", " ")}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">{item.user}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-slate-300 text-sm">{item.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{item.votes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Prompt */}
      <Card className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-violet-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Top Feature Request</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              "Group study sessions" has received <span className="text-violet-300 font-medium">567 votes</span> and 
              is the most requested feature this month. Consider prioritizing this for the next sprint.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                Add to Roadmap
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800">
                View All Requests
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminFeedback;
