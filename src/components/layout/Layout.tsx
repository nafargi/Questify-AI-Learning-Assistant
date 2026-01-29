import { ReactNode, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AIAssistantButton } from "../ai/AIAssistantButton";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Bell, MagnifyingGlass, Sun, Moon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { studentProfile } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  title?: string;
}

export function Layout({ children, showSidebar = true, title }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences } = useAppContext();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show sidebar on landing page or auth pages
  const isPublicPage = location.pathname === "/" || location.pathname === "/auth";
  const shouldShowSidebar = showSidebar && !isPublicPage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {shouldShowSidebar && <AppSidebar />}

      <div
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          shouldShowSidebar && !isMobile && (preferences.sidebarCollapsed ? "pl-[72px]" : "pl-64"),
          shouldShowSidebar && isMobile && "pl-0"
        )}
      >
        {/* Top Header */}
        {!isPublicPage && (
          <header className={cn(
            "h-14 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30",
            shouldShowSidebar && isMobile && "pl-14"
          )}>
            <div className="flex items-center gap-4">
              {title && (
                <h1 className="text-xl font-bold tracking-tight">
                  {title}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              {/* Search */}
              <div className="relative w-48 lg:w-96 hidden sm:block">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-9 bg-muted/50 border-none h-9 rounded-lg focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-2 border-background">
                  3
                </Badge>
              </Button>

              {/* User */}
              <div className="h-8 w-px bg-border mx-2 hidden md:block" />
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 hover:bg-muted/50 p-1 rounded-full transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {studentProfile.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left text-xs">
                  <p className="font-bold leading-none">{studentProfile.name}</p>
                  <p className="text-muted-foreground mt-0.5">Premium Student</p>
                </div>
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <AIAssistantButton />
    </div>
  );
}
