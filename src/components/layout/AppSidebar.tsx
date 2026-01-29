import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SquaresFour,
  Upload,
  Brain,
  BookOpen,
  Calendar,
  GraduationCap,
  User,
  Gear,
  SignOut,
  Sparkle,
  CaretLeft,
  CaretRight,
  Bell,
  ClockCounterClockwise,
  ChatCircle,
  CreditCard,
  List,
  Stack,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const navItems = [
  { icon: SquaresFour, label: "Dashboard", path: "/dashboard", id: "nav-dashboard" },
  { icon: Upload, label: "Upload Material", path: "/upload", id: "nav-upload" },
  { icon: Brain, label: "Exam Room", path: "/exam", id: "nav-exam" },
  { icon: BookOpen, label: "Note Room", path: "/notes", id: "nav-notes" },
  { icon: GraduationCap, label: "Study Room", path: "/study-room", id: "nav-study-room" },
  { icon: ChatCircle, label: "Questy AI", path: "/questy-chat", id: "nav-questy-chat" },
  { icon: ClockCounterClockwise, label: "Exam History", path: "/exam-history", id: "nav-exam-history" },
  { icon: Calendar, label: "Study Planner", path: "/planner", id: "nav-planner" },
];

const accountItems = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Gear, label: "Settings", path: "/settings" },
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
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate("/");
    onNavigate?.();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const NavItem = ({ item, isActive }: { item: { icon: any; label: string; path: string; id?: string }; isActive: boolean }) => {
    const content = (
      <Link
        to={item.path}
        id={item.id}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
          isActive
            ? "bg-primary/10 text-primary font-bold shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
          isActive ? "text-primary" : ""
        )} />
        {!collapsed && (
          <span className="truncate">{item.label}</span>
        )}
        {isActive && !collapsed && (
          <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary" />
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
    <div className="flex flex-col h-full bg-card border-r shadow-sm">
      {/* Logo Header */}
      <div className={cn(
        "h-14 flex items-center px-6 border-b",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
            <GraduationCap className="h-5 w-5 text-primary-foreground" weight="fill" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-foreground">Questify</span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hidden lg:flex rounded-full"
            onClick={onToggle}
          >
            <CaretLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Collapsed Toggle Button */}
      {collapsed && (
        <div className="flex justify-center pb-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onToggle}
          >
            <CaretRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-sm">
        {/* <div className={cn("mb-4", collapsed ? "px-1 text-center" : "px-3")}>
          {!collapsed && (
            <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Neural Network
            </span>
          )}
        </div> */}
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}

        <div className={cn("pt-8 mt-6", collapsed ? "px-1 text-center" : "px-3")}>
          {!collapsed && (
            <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Account
            </span>
          )}
        </div>
        <div className="pt-2 space-y-1 text-sm">
          {accountItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>




      {/* Sign Out */}
      <div className="p-4 border-t bg-muted/30 text-sm">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <SignOut className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Sign Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleSignOut}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all group"
          >
            <div className="flex items-center gap-3">
              <SignOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="font-medium">Sign Out</span>
            </div>
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
          className="fixed top-4 left-4 z-50 h-10 w-10 bg-card shadow-lg border text-foreground hover:bg-accent lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <List className="w-5 h-5" />
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-72 border-0">
            <SidebarContent
              collapsed={false}
              onToggle={() => { }}
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
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 hidden lg:block shadow-sm",
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
