import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  Brain,
  BookOpen,
  Calendar,
  GraduationCap,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload", path: "/upload" },
  { icon: Brain, label: "Smart Exam", path: "/exam" },
  { icon: BookOpen, label: "Notes", path: "/notes" },
  { icon: Calendar, label: "Planner", path: "/planner" },
  { icon: GraduationCap, label: "Study Room", path: "/study-room" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: LogOut, label: "Sign Out", path: "/" },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg gradient-text">Questify</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "gradient-primary text-white shadow-lg shadow-primary/25"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")} />
              {!collapsed && (
                <span className={cn("font-medium text-sm", isActive && "text-white")}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Pro Card */}
      {!collapsed && (
        <div className="p-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Questify Pro</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock all features and unlimited exams
            </p>
            <Button size="sm" className="w-full gradient-primary text-xs">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}
