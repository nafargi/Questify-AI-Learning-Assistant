import { NoteContent } from "@/data/mockNotes";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const FlowchartNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-black mb-12 text-center">{content.title}</h1>

      <div className="flex flex-col items-center w-full space-y-2">
        {content.nodes?.map((node, i) => {
          // Determine styling based on node type
          let shapeClass = "rounded-lg";
          let colorClass = "bg-card border border-border";

          if (node.type === 'start' || node.type === 'end') {
            shapeClass = "rounded-full px-8";
            colorClass = "bg-primary text-primary-foreground border-primary";
          } else if (node.type === 'decision') {
            shapeClass = "transform rotate-45 aspect-square flex items-center justify-center p-6";
            colorClass = "bg-orange-500/10 border border-orange-500 text-orange-700 dark:text-orange-300";
          } else if (node.type === 'process') {
            shapeClass = "rounded-md w-64";
            colorClass = "bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300";
          }

          // If decision, we need to un-rotate the text
          const contentInner = node.type === 'decision'
            ? <span className="transform -rotate-45 block text-center text-sm font-bold">{node.text}</span>
            : <span className="text-center font-bold">{node.text}</span>;

          return (
            <div key={node.id} className="flex flex-col items-center">
              <div className={cn(
                "relative shadow-sm py-4 px-6 min-w-[150px] transition-all hover:scale-105 cursor-default z-10 text-center flex items-center justify-center",
                shapeClass,
                colorClass
              )}>
                {contentInner}
              </div>

              {/* Connecting Line (unless end) */}
              {node.connections.length > 0 && (
                <div className="h-12 w-0.5 bg-border my-1 relative">
                  <ArrowDown className="absolute -bottom-2 -left-2 w-4 h-4 text-border" />
                </div>
              )}

              {/* Branching Lines visualization is tricky in pure flex column, 
                            so we simplified to linear for now, but decision splits would ideally use a sub-grid.
                            For MVP, we show linear flow primarily.
                         */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
