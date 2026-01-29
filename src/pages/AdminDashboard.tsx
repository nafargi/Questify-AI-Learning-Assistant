import { useState } from "react";
import {
  Layout, Users, FileText, ClipboardText, BookOpen,
  Brain, ChatCircle, ChartBar, Bell, Calendar, Shield,
  Pulse, Gear, SignOut, CaretRight,
  TrendUp, TrendDown, Minus
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminContent from "@/components/admin/AdminContent";
import AdminExams from "@/components/admin/AdminExams";
import AdminTechniques from "@/components/admin/AdminTechniques";
import AdminAIConfig from "@/components/admin/AdminAIConfig";
import AdminQuestyMonitor from "@/components/admin/AdminQuestyMonitor";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminPlanner from "@/components/admin/AdminPlanner";
import AdminSecurity from "@/components/admin/AdminSecurity";
import AdminHealth from "@/components/admin/AdminHealth";
import AdminFeedback from "@/components/admin/AdminFeedback";

const menuItems = [
  { id: "overview", label: "Overview", icon: Layout },
  { id: "users", label: "User Management", icon: Users },
  { id: "content", label: "Content Oversight", icon: FileText },
  { id: "exams", label: "Exam System", icon: ClipboardText },
  { id: "techniques", label: "Teaching Techniques", icon: BookOpen },
  { id: "ai-config", label: "AI Configuration", icon: Brain },
  { id: "questy", label: "Questy AI Monitor", icon: ChatCircle },
  { id: "analytics", label: "Analytics & Insights", icon: ChartBar },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "planner", label: "Planner Logic", icon: Calendar },
  { id: "security", label: "Security & Access", icon: Shield },
  { id: "health", label: "System Health", icon: Pulse },
  { id: "feedback", label: "Feedback", icon: ChatCircle },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <AdminOverview />;
      case "users": return <AdminUsers />;
      case "content": return <AdminContent />;
      case "exams": return <AdminExams />;
      case "techniques": return <AdminTechniques />;
      case "ai-config": return <AdminAIConfig />;
      case "questy": return <AdminQuestyMonitor />;
      case "analytics": return <AdminAnalytics />;
      case "notifications": return <AdminNotifications />;
      case "planner": return <AdminPlanner />;
      case "security": return <AdminSecurity />;
      case "health": return <AdminHealth />;
      case "feedback": return <AdminFeedback />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-white font-semibold">Questify</h1>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeSection === item.id
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {activeSection === item.id && (
                    <CaretRight className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all">
            <Gear className="w-5 h-5" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <SignOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
