import { Link, useLocation, useNavigate } from "react-router-dom";
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
  History,
  MessageSquare,
  CreditCard,
  Menu,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload Material", path: "/upload" },
  { icon: Brain, label: "Smart Exam", path: "/exam" },
  { icon: History, label: "Exam History", path: "/exam-history" },
  { icon: BookOpen, label: "AI Notes", path: "/notes" },
  { icon: Layers, label: "Flashcards", path: "/flashcards" },
  { icon: Calendar, label: "Study Planner", path: "/planner" },
  { icon: GraduationCap, label: "Study Room", path: "/study-room" },
  { icon: MessageSquare, label: "Questy AI", path: "/questy-chat" },
];

const accountItems = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

function SidebarContent({ 
  collapsed, 
  onToggle, 
  onNavigate 
}: { 
  collapsed: boolean; 
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate("/");
    onNavigate?.();
  };

  const NavItem = ({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) => {
    const content = (
      <Link
        to={item.path}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
          isActive
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-slate-200 hover:text-white hover:bg-white/10"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5 flex-shrink-0",
          isActive ? "text-primary-foreground" : "text-slate-300 group-hover:text-white"
        )} />
        {!collapsed && (
          <span className={cn(
            "font-medium text-sm truncate",
            isActive ? "text-primary-foreground" : "text-slate-200 group-hover:text-white"
          )}>
            {item.label}
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium bg-slate-800 text-white border-slate-700">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Logo Header */}
      <div className={cn(
        "h-16 flex items-center border-b border-slate-700/50 px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-white">Questify</span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 hidden lg:flex"
            onClick={onToggle}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Collapsed Toggle Button */}
      {collapsed && (
        <div className="flex justify-center py-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
            onClick={onToggle}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className={cn("mb-4", collapsed ? "px-1" : "px-2")}>
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Learning
            </span>
          )}
        </div>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}

        <div className={cn("pt-4 mt-4 border-t border-slate-700/50", collapsed ? "px-1" : "px-2")}>
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </span>
          )}
        </div>
        <div className="pt-2 space-y-1">
          {accountItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>

      {/* Pro Card */}
      {!collapsed && (
        <div className="p-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 border border-slate-700/50">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mb-3 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1 text-white">Questify Pro</h4>
            <p className="text-xs text-slate-300 mb-3">
              Unlock unlimited exams & AI features
            </p>
            <Button 
              size="sm" 
              className="w-full gradient-primary text-xs text-white hover:opacity-90"
              onClick={() => {
                navigate("/billing");
                onNavigate?.();
              }}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      {/* Sign Out */}
      <div className="p-3 border-t border-slate-700/50">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium bg-slate-800 text-white border-slate-700">
              Sign Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function AppSidebar() {
  const { preferences, setSidebarCollapsed } = useAppContext();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sheet on route change
  const location = useLocation();
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Mobile: Sheet overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile trigger button - fixed position */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 h-10 w-10 bg-slate-900 shadow-lg border-slate-700 text-white hover:bg-slate-800 lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-72 border-0 bg-slate-900">
            <SidebarContent 
              collapsed={false} 
              onToggle={() => {}} 
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 hidden lg:block shadow-xl",
        preferences.sidebarCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <SidebarContent 
        collapsed={preferences.sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!preferences.sidebarCollapsed)} 
      />
    </aside>
  );
}