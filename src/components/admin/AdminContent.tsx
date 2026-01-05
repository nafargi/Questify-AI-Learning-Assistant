import { 
  FileText, FileImage, FileVideo, File, AlertTriangle,
  Search, Filter, Download, Trash2, Eye, BarChart2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const contentStats = [
  { label: "Total Materials", value: "89,234", icon: FileText, color: "from-violet-500 to-purple-600" },
  { label: "PDFs", value: "45,678", icon: File, color: "from-blue-500 to-cyan-600" },
  { label: "Images", value: "23,456", icon: FileImage, color: "from-emerald-500 to-teal-600" },
  { label: "Flagged Content", value: "127", icon: AlertTriangle, color: "from-red-500 to-orange-600" },
];

const recentMaterials = [
  { 
    name: "Advanced Calculus Chapter 5.pdf", user: "Sarah Chen", 
    type: "PDF", size: "2.4 MB", usage: 234, uploaded: "2 hours ago",
    status: "approved"
  },
  { 
    name: "Organic Chemistry Notes.pdf", user: "Marcus Johnson", 
    type: "PDF", size: "1.8 MB", usage: 156, uploaded: "5 hours ago",
    status: "approved"
  },
  { 
    name: "Physics Diagrams.png", user: "Emily Rodriguez", 
    type: "Image", size: "856 KB", usage: 89, uploaded: "1 day ago",
    status: "pending"
  },
  { 
    name: "Biology Lab Report.pdf", user: "David Kim", 
    type: "PDF", size: "3.2 MB", usage: 12, uploaded: "2 days ago",
    status: "flagged"
  },
  { 
    name: "History Timeline.pdf", user: "Lisa Wang", 
    type: "PDF", size: "1.1 MB", usage: 78, uploaded: "3 days ago",
    status: "approved"
  },
];

const storageBreakdown = [
  { type: "PDFs", percentage: 52, size: "4.2 TB", color: "bg-violet-500" },
  { type: "Images", percentage: 28, size: "2.3 TB", color: "bg-blue-500" },
  { type: "Documents", percentage: 15, size: "1.2 TB", color: "bg-emerald-500" },
  { type: "Other", percentage: 5, size: "0.4 TB", color: "bg-slate-500" },
];

const AdminContent = () => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF": return <File className="w-5 h-5 text-red-400" />;
      case "Image": return <FileImage className="w-5 h-5 text-blue-400" />;
      case "Video": return <FileVideo className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Content & Material Oversight</h1>
        <p className="text-slate-400">Monitor and manage all uploaded learning materials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {contentStats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Storage Breakdown */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-violet-400" />
            Storage Breakdown
          </h3>
          <div className="mb-6">
            <div className="flex h-4 rounded-full overflow-hidden">
              {storageBreakdown.map((item, i) => (
                <div 
                  key={i}
                  className={`${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {storageBreakdown.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-slate-300 text-sm">{item.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-medium text-sm">{item.size}</span>
                  <span className="text-slate-500 text-sm ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Storage Used</span>
              <span className="text-white font-bold">8.1 TB / 10 TB</span>
            </div>
            <Progress value={81} className="mt-3 h-2 bg-slate-800" />
          </div>
        </Card>

        {/* Recent Materials */}
        <Card className="bg-slate-900/50 border-slate-800 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-400" />
              Recent Uploads
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search materials..."
                className="pl-10 bg-slate-800 border-slate-700 text-slate-200 text-sm"
              />
            </div>
          </div>
          <div className="space-y-3">
            {recentMaterials.map((material, i) => (
              <div 
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                  {getFileIcon(material.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 font-medium truncate">{material.name}</p>
                  <p className="text-slate-500 text-sm">{material.user} • {material.size}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-slate-300 text-sm">{material.usage} views</p>
                    <p className="text-slate-500 text-xs">{material.uploaded}</p>
                  </div>
                  <Badge className={
                    material.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                    material.status === "pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                    "bg-red-500/20 text-red-400 border-red-500/30"
                  }>
                    {material.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                      <Download className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Flagged Content Alert */}
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">127 Items Flagged for Review</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Content has been flagged for potential policy violations including copyrighted material, 
              inappropriate content, or suspicious file patterns. Review and take action to maintain platform integrity.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30">
                Review Flagged Content
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800">
                View Policy Guidelines
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminContent;
