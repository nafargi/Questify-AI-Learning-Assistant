import { cn } from "@/lib/utils";
import { Plus, GripVertical } from "lucide-react";

interface BoxingNoteProps {
  content: {
    boxes: Array<{
      title: string;
      color: string;
      items: string[];
    }>;
  };
}

const boxColors = [
  { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", header: "bg-blue-500", text: "text-blue-700 dark:text-blue-300" },
  { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", header: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800", header: "bg-purple-500", text: "text-purple-700 dark:text-purple-300" },
  { bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800", header: "bg-orange-500", text: "text-orange-700 dark:text-orange-300" },
  { bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-200 dark:border-rose-800", header: "bg-rose-500", text: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-200 dark:border-cyan-800", header: "bg-cyan-500", text: "text-cyan-700 dark:text-cyan-300" },
];

export function BoxingNote({ content }: BoxingNoteProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground">Boxing Method</h3>
          <p className="text-sm text-muted-foreground">Group related information into visual boxes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4" />
          Add Box
        </button>
      </div>

      {/* Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.boxes.map((box, i) => {
          const colors = boxColors[i % boxColors.length];
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                "hover:shadow-lg hover:scale-[1.02] cursor-pointer group",
                colors.bg, colors.border
              )}
            >
              {/* Box Header */}
              <div className={cn("px-4 py-3 flex items-center justify-between", colors.header)}>
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-white/60 cursor-grab" />
                  <h4 className="font-bold text-sm text-white">{box.title}</h4>
                </div>
                <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                  {box.items.length} items
                </span>
              </div>

              {/* Box Content */}
              <div className="p-4 space-y-3">
                {box.items.map((item, j) => (
                  <div
                    key={j}
                    className={cn(
                      "p-3 rounded-xl bg-background/80 border border-transparent",
                      "hover:border-primary/20 transition-all duration-200"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.header)} />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  </div>
                ))}

                {/* Add Item */}
                <button className="w-full p-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 text-muted-foreground hover:text-primary text-sm transition-all opacity-0 group-hover:opacity-100">
                  + Add item
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty Box Placeholder */}
        <div className="rounded-2xl border-2 border-dashed border-border hover:border-primary/40 flex items-center justify-center min-h-[200px] cursor-pointer group transition-colors">
          <div className="text-center">
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" />
            <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Create new box</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Drag boxes to reorganize • Click to edit • Color-code for quick reference
        </p>
      </div>
    </div>
  );
}
