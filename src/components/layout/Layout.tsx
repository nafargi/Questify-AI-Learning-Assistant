import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AIAssistantButton } from "../ai/AIAssistantButton";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const location = useLocation();
  const { preferences } = useAppContext();
  const isMobile = useIsMobile();
  
  // Don't show sidebar on landing page or auth pages
  const isPublicPage = location.pathname === "/" || location.pathname === "/auth";
  const shouldShowSidebar = showSidebar && !isPublicPage;

  return (
    <div className="min-h-screen bg-background">
      {shouldShowSidebar && <AppSidebar />}
      <main 
        className={cn(
          "transition-all duration-300",
          shouldShowSidebar && !isMobile && (preferences.sidebarCollapsed ? "pl-[72px]" : "pl-64"),
          shouldShowSidebar && isMobile && "pl-0"
        )}
      >
        {children}
      </main>
      <AIAssistantButton />
    </div>
  );
}