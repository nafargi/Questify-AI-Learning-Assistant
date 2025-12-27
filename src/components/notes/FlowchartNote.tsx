import { cn } from "@/lib/utils";
import { Circle, Diamond, Square, ArrowDown, ArrowRight, Plus } from "lucide-react";

interface FlowchartNoteProps {
  content: {
    title: string;
    nodes: Array<{
      id: string;
      type: "start" | "process" | "decision" | "end";
      text: string;
      connections?: string[];
    }>;
  };
}

export function FlowchartNote({ content }: FlowchartNoteProps) {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case "start":
        return {
          shape: "rounded-full",
          bg: "bg-gradient-to-br from-green-500 to-emerald-500",
          text: "text-white",
          icon: Circle,
        };
      case "end":
        return {
          shape: "rounded-full",
          bg: "bg-gradient-to-br from-red-500 to-rose-500",
          text: "text-white",
          icon: Circle,
        };
      case "decision":
        return {
          shape: "rotate-45",
          bg: "bg-gradient-to-br from-yellow-500 to-orange-500",
          text: "text-white -rotate-45",
          icon: Diamond,
        };
      case "process":
      default:
        return {
          shape: "rounded-xl",
          bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
          text: "text-white",
          icon: Square,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground">Flowchart Notes</h3>
          <p className="text-sm text-muted-foreground">Visualize processes and decision trees</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
            <Square className="w-4 h-4" />
            Process
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm">
            <Diamond className="w-4 h-4" />
            Decision
          </button>
        </div>
      </div>

      {/* Flowchart Canvas */}
      <div className="rounded-2xl border-2 border-border bg-gradient-to-br from-muted/30 to-muted/10 p-8 min-h-[500px]">
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500" />
            Start/End
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-cyan-500" />
            Process
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 rotate-45 bg-gradient-to-br from-yellow-500 to-orange-500" />
            Decision
          </span>
        </div>

        {/* Flowchart Nodes */}
        <div className="flex flex-col items-center gap-4">
          {content.nodes.map((node, i) => {
            const style = getNodeStyle(node.type);
            const isDecision = node.type === "decision";

            return (
              <div key={node.id} className="flex flex-col items-center">
                {/* Node */}
                <div
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group",
                    isDecision ? "w-28 h-28" : "min-w-[160px] px-6 py-4",
                    style.shape,
                    style.bg,
                    "shadow-lg"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium text-center",
                    style.text,
                    isDecision && "text-xs"
                  )}>
                    {node.text}
                  </span>

                  {/* Node ID */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border text-xs font-bold flex items-center justify-center text-foreground">
                    {i + 1}
                  </span>
                </div>

                {/* Connector Arrow */}
                {i < content.nodes.length - 1 && (
                  <div className="flex flex-col items-center my-2">
                    {content.nodes[i].type === "decision" ? (
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-green-600 font-medium mb-1">Yes</span>
                          <ArrowDown className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <ArrowDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Node Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
            Add Node
          </button>
        </div>
      </div>

      {/* Process Description */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-bold text-sm text-foreground mb-2">{content.title}</h4>
        <div className="flex flex-wrap gap-2">
          {content.nodes.map((node, i) => (
            <span key={i} className="text-xs text-muted-foreground">
              {i + 1}. {node.text}
              {i < content.nodes.length - 1 && " →"}
            </span>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Drag nodes to reorganize • Click to edit • Connect with arrows
        </p>
      </div>
    </div>
  );
}
