import { useState } from "react";
import { 
  Bell, Plus, Send, Users, Filter, Clock, 
  CheckCircle, AlertCircle, Info, Megaphone, Trash2, Edit
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const recentNotifications = [
  { 
    id: 1, title: "New Study Technique Available", 
    message: "Try our new Spaced Repetition feature for better retention!",
    type: "feature", audience: "All Users", sent: "2 hours ago",
    delivered: 24567, opened: 18234
  },
  { 
    id: 2, title: "Scheduled Maintenance", 
    message: "Questify will be down for maintenance on Sunday 2AM-4AM EST.",
    type: "system", audience: "All Users", sent: "1 day ago",
    delivered: 24567, opened: 21345
  },
  { 
    id: 3, title: "Your Study Streak!", 
    message: "You've studied for 7 days in a row! Keep it up!",
    type: "engagement", audience: "Active Users", sent: "2 days ago",
    delivered: 18293, opened: 15678
  },
  { 
    id: 4, title: "Premium Features Unlocked", 
    message: "Enjoy your new premium benefits including unlimited exams.",
    type: "account", audience: "Premium Users", sent: "3 days ago",
    delivered: 5678, opened: 4567
  },
];

const audienceSegments = [
  { label: "All Users", count: 24847 },
  { label: "Active Users (7 days)", count: 18293 },
  { label: "Premium Users", count: 5678 },
  { label: "Inactive Users (30+ days)", count: 5842 },
  { label: "New Users (7 days)", count: 1234 },
];

const AdminNotifications = () => {
  const [showComposer, setShowComposer] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Megaphone className="w-4 h-4 text-violet-400" />;
      case "system": return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "engagement": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "account": return <Info className="w-4 h-4 text-blue-400" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications & System Messaging</h1>
          <p className="text-slate-400">Send targeted notifications and manage system announcements</p>
        </div>
        <Button 
          className="bg-violet-600 hover:bg-violet-700 text-white"
          onClick={() => setShowComposer(!showComposer)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Notification
        </Button>
      </div>

      {/* Composer */}
      {showComposer && (
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-violet-400" />
            Compose Notification
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Title</label>
                <Input 
                  placeholder="Notification title..."
                  className="bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Message</label>
                <Textarea 
                  placeholder="Write your message..."
                  className="bg-slate-800 border-slate-700 text-slate-200 min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Type</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="feature">Feature Update</SelectItem>
                      <SelectItem value="system">System Alert</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Priority</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Target Audience</label>
                <div className="space-y-2">
                  {audienceSegments.map((segment) => (
                    <div 
                      key={segment.label}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded bg-slate-700 border-slate-600" />
                        <span className="text-slate-300 text-sm">{segment.label}</span>
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {segment.count.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <span className="text-slate-300">Schedule for later</span>
                <Switch className="data-[state=checked]:bg-violet-600" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-800">
            <Button 
              variant="outline" 
              className="bg-transparent border-slate-700 text-slate-300"
              onClick={() => setShowComposer(false)}
            >
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Sent Today", value: "3", icon: Send },
          { label: "Avg. Open Rate", value: "74.2%", icon: CheckCircle },
          { label: "Scheduled", value: "2", icon: Clock },
          { label: "Total Reach", value: "24,847", icon: Users },
        ].map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-violet-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Notifications */}
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-400" />
            Recent Notifications
          </h3>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
            <Filter className="w-4 h-4 mr-1" /> Filter
          </Button>
        </div>
        <div className="divide-y divide-slate-800">
          {recentNotifications.map((notification) => (
            <div 
              key={notification.id}
              className="p-6 hover:bg-slate-800/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{notification.title}</h4>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {notification.audience}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{notification.message}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-slate-500">{notification.sent}</span>
                    <span className="text-slate-400">
                      <span className="text-emerald-400">{notification.delivered.toLocaleString()}</span> delivered
                    </span>
                    <span className="text-slate-400">
                      <span className="text-blue-400">{notification.opened.toLocaleString()}</span> opened
                    </span>
                    <span className="text-slate-400">
                      {((notification.opened / notification.delivered) * 100).toFixed(1)}% open rate
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <Edit className="w-4 h-4 text-slate-400" />
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
  );
};

export default AdminNotifications;
