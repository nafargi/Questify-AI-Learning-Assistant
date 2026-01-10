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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload Material", path: "/upload" },
  { icon: Brain, label: "Smart Exam", path: "/exam" },
  { icon: History, label: "Exam History", path: "/exam-history" },
  { icon: BookOpen, label: "AI Notes", path: "/notes" },
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
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/25"
            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        )}
      >
        <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")} />
        {!collapsed && (
          <span className={cn("font-medium text-sm truncate", isActive && "text-white")}>
            {item.label}
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <div className="flex flex-col h-full bg-sidebar-background">
      {/* Logo Header */}
      <div className={cn(
        "h-16 flex items-center border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-sidebar-foreground">Questify</span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent hidden lg:flex"
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
            className="h-8 w-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
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
            <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
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

        <div className={cn("pt-4 mt-4 border-t border-sidebar-border", collapsed ? "px-1" : "px-2")}>
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
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
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sidebar-primary/20 via-secondary/10 to-accent/10 border border-sidebar-border">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1 text-sidebar-foreground">Questify Pro</h4>
            <p className="text-xs text-sidebar-foreground/60 mb-3">
              Unlock unlimited exams & AI features
            </p>
            <Button 
              size="sm" 
              className="w-full gradient-primary text-xs"
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
      <div className="p-3 border-t border-sidebar-border">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              Sign Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
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
          className="fixed top-4 left-4 z-50 h-10 w-10 bg-card shadow-md border lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-72 border-0">
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
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 hidden lg:block",
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
