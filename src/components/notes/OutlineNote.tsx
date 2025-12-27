import { ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutlineNoteProps {
  content: {
    sections: Array<{
      title: string;
      points: Array<{
        main: string;
        sub?: string[];
      }>;
    }>;
  };
}

export function OutlineNote({ content }: OutlineNoteProps) {
  return (
    <div className="bg-card rounded-2xl border-2 border-border/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500/10 via-teal-500/10 to-emerald-500/10 px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">Outline Notes</h3>
            <p className="text-sm text-muted-foreground">Hierarchical structure</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="font-bold text-primary">I.</span> Main</span>
            <span className="flex items-center gap-1"><span className="font-bold text-secondary">A.</span> Sub</span>
            <span className="flex items-center gap-1"><span className="font-bold text-muted-foreground">1.</span> Detail</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {content.sections.map((section, i) => (
          <div key={i} className="space-y-4">
            {/* Main Section Header */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
                {String.fromCharCode(73 + i)} {/* Roman numeral style: I, J, K... */}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary/30 transition-all duration-500" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Sub Points */}
            <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-4">
              {section.points.map((point, j) => (
                <div key={j} className="space-y-2">
                  {/* Main Point */}
                  <div className="flex items-start gap-3 group">
                    <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm shrink-0">
                      {String.fromCharCode(65 + j)}.
                    </span>
                    <p className="text-sm font-medium text-foreground pt-1 group-hover:text-secondary transition-colors">
                      {point.main}
                    </p>
                  </div>

                  {/* Sub Points */}
                  {point.sub && point.sub.length > 0 && (
                    <div className="ml-8 border-l border-secondary/20 pl-4 space-y-2">
                      {point.sub.map((subPoint, k) => (
                        <div key={k} className="flex items-start gap-2 group">
                          <span className="text-xs text-muted-foreground font-medium shrink-0 pt-0.5">
                            {k + 1}.
                          </span>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {subPoint}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add More Section */}
        <div className="pt-4 border-t border-dashed border-border">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Circle className="w-4 h-4" />
            <span>Add new section...</span>
          </button>
        </div>
      </div>
    </div>
  );
}
