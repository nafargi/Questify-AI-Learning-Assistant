import { cn } from "@/lib/utils";

interface MindMapNoteProps {
  content: {
    center: string;
    branches: Array<{
      title: string;
      items: string[];
      color: string;
    }>;
  };
}

const branchColors = [
  { bg: "bg-blue-100 dark:bg-blue-950/40", border: "border-blue-300 dark:border-blue-800", text: "text-blue-700 dark:text-blue-300", line: "bg-blue-400" },
  { bg: "bg-emerald-100 dark:bg-emerald-950/40", border: "border-emerald-300 dark:border-emerald-800", text: "text-emerald-700 dark:text-emerald-300", line: "bg-emerald-400" },
  { bg: "bg-purple-100 dark:bg-purple-950/40", border: "border-purple-300 dark:border-purple-800", text: "text-purple-700 dark:text-purple-300", line: "bg-purple-400" },
  { bg: "bg-orange-100 dark:bg-orange-950/40", border: "border-orange-300 dark:border-orange-800", text: "text-orange-700 dark:text-orange-300", line: "bg-orange-400" },
  { bg: "bg-rose-100 dark:bg-rose-950/40", border: "border-rose-300 dark:border-rose-800", text: "text-rose-700 dark:text-rose-300", line: "bg-rose-400" },
  { bg: "bg-cyan-100 dark:bg-cyan-950/40", border: "border-cyan-300 dark:border-cyan-800", text: "text-cyan-700 dark:text-cyan-300", line: "bg-cyan-400" },
];

export function MindMapNote({ content }: MindMapNoteProps) {
  return (
    <div className="relative p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl min-h-[500px] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mindmap-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-primary/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mindmap-grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Central Node */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-40 animate-pulse-slow" />
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30 border-4 border-background">
            <div className="absolute inset-2 rounded-full border-2 border-primary-foreground/20" />
            <span className="text-primary-foreground font-bold text-center text-lg px-6 leading-tight">{content.center}</span>
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
        </div>

        {/* Connection Lines to Branches */}
        <div className="absolute top-44 left-1/2 transform -translate-x-1/2 w-full">
          <svg className="w-full h-16" viewBox="0 0 800 60" preserveAspectRatio="xMidYMin">
            {content.branches.map((_, i) => {
              const totalBranches = content.branches.length;
              const xPos = ((i + 0.5) / totalBranches) * 800;
              return (
                <path
                  key={i}
                  d={`M 400 0 Q ${xPos} 30 ${xPos} 60`}
                  fill="none"
                  stroke={`hsl(var(--primary))`}
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  className="opacity-40"
                />
              );
            })}
          </svg>
        </div>

        {/* Branches */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-8">
          {content.branches.map((branch, i) => {
            const colors = branchColors[i % branchColors.length];
            return (
              <div key={i} className="flex flex-col items-center group">
                {/* Branch connector */}
                <div className={cn("w-1 h-8 rounded-full", colors.line, "opacity-60 group-hover:opacity-100 transition-opacity")} />
                
                {/* Branch Node */}
                <div className={cn(
                  "w-full p-5 rounded-2xl border-2 transition-all duration-300",
                  colors.bg, colors.border,
                  "hover:shadow-lg hover:scale-105 cursor-pointer"
                )}>
                  {/* Branch Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("w-3 h-3 rounded-full", colors.line)} />
                    <h4 className={cn("font-bold text-sm", colors.text)}>{branch.title}</h4>
                  </div>
                  
                  {/* Branch Items */}
                  <ul className="space-y-2">
                    {branch.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", colors.line, "opacity-60")} />
                        <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Click branches to expand • Drag to reorganize • Add new branches with +
          </p>
        </div>
      </div>
    </div>
  );
}
