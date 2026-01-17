import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Timer, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudySessionLayoutProps {
    title: string;
    subtitle?: string;
    icon?: React.ElementType;
    color?: string; // stored as tailwind class like "text-green-500"
    children: ReactNode;
    onExit: () => void;
    rightAction?: ReactNode;
}

export function StudySessionLayout({
    title,
    subtitle,
    icon: Icon,
    color,
    children,
    onExit,
    rightAction
}: StudySessionLayoutProps) {
    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            {/* Unified Header */}
            <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onExit} className="gap-2 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="w-4 h-4" />
                        Exit Session
                    </Button>
                    <div className="h-6 w-px bg-border/50" />
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className={cn("p-2 rounded-lg bg-primary/10", color)}>
                                <Icon className="w-5 h-5" />
                            </div>
                        )}
                        <div>
                            <h1 className="font-bold text-sm leading-tight">{title}</h1>
                            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Placeholder for a universal session timer */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full text-xs font-mono text-muted-foreground">
                        <Timer className="w-3 h-3" />
                        <span>00:00</span>
                    </div>
                    {rightAction}
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
