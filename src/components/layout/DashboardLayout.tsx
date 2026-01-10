import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AIAssistantButton } from "../ai/AIAssistantButton";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { studentProfile } from "@/data/mockData";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { preferences } = useAppContext();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {/* Main Content */}
      <div 
        className={cn(
          "transition-all duration-300",
          isMobile ? "pl-0" : preferences.sidebarCollapsed ? "pl-[72px]" : "pl-64"
        )}
      >
        {/* Top Header */}
        <header className={cn(
          "h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30",
          isMobile && "pl-16"
        )}>
          <div className="flex items-center gap-4">
            {title && <h1 className="text-lg lg:text-xl font-bold truncate">{title}</h1>}
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search - hidden on mobile */}
            <div className="relative w-48 lg:w-80 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-muted/50 border-0"
              />
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-destructive">
                3
              </Badge>
            </Button>

            {/* User */}
            <button 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs lg:text-sm">
                  {studentProfile.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{studentProfile.name}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      <AIAssistantButton />
    </div>
  );
}
