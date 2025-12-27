import { cn } from "@/lib/utils";

interface CornellNoteProps {
  content: {
    cues: string[];
    notes: string[];
    summary: string;
  };
  isEditing?: boolean;
}

export function CornellNote({ content, isEditing = false }: CornellNoteProps) {
  return (
    <div className="border-2 border-primary/30 rounded-2xl overflow-hidden bg-card shadow-lg">
      {/* Header */}
      <div className="bg-primary/10 px-6 py-4 border-b-2 border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-primary">Cornell Notes</h3>
            <p className="text-sm text-muted-foreground">Structured learning format</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">Cue</span>
            <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-medium rounded-full">Notes</span>
            <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">Summary</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 min-h-[450px]">
        {/* Cue Column - 3/12 */}
        <div className="col-span-3 bg-primary/5 p-5 border-r-2 border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <h4 className="font-bold text-sm text-primary uppercase tracking-wider">Cue Column</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4 italic">Keywords, questions, or prompts</p>
          <div className="space-y-3">
            {content.cues.map((cue, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-4 rounded-xl border-2 border-primary/20 bg-card transition-all duration-300",
                  "hover:border-primary/40 hover:shadow-md cursor-pointer group"
                )}
              >
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-primary group-hover:text-primary/80">{cue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Column - 9/12 */}
        <div className="col-span-9 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <h4 className="font-bold text-sm text-secondary uppercase tracking-wider">Note-Taking Area</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4 italic">Main ideas, explanations, and details</p>
          
          <div className="space-y-4">
            {content.notes.map((note, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 hover:bg-muted/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full min-h-[20px] rounded-full bg-gradient-to-b from-secondary to-secondary/30" />
                  <p className="text-sm leading-relaxed text-foreground">{note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Connection Lines */}
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent" />
            <span>Connect cues to notes during review</span>
            <div className="flex-1 h-px bg-gradient-to-l from-primary/20 via-secondary/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="border-t-2 border-primary/30 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <h4 className="font-bold text-sm text-secondary uppercase tracking-wider">Summary</h4>
          <span className="text-xs text-muted-foreground ml-2">— Synthesize key points in your own words</span>
        </div>
        <div className="p-4 bg-card rounded-xl border border-secondary/20">
          <p className="text-sm text-muted-foreground leading-relaxed">{content.summary}</p>
        </div>
      </div>
    </div>
  );
}
