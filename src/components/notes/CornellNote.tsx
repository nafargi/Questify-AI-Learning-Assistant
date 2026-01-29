import { NoteContent } from "@/data/mockNotes";
import { BookOpen, Pencil } from "@phosphor-icons/react";

export const CornellNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-card border-x border-dashed shadow-sm">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] border-r border-dashed border-border/60 bg-muted/10 p-6 overflow-y-auto">
          <h3 className="text-xs font-black uppercase text-muted-foreground mb-6 tracking-widest">Cues & Questions</h3>
          <div className="space-y-8">
            {content.cues?.map((cue, idx) => (
              <div key={idx} className="group relative">
                <span className="absolute -left-4 top-1 text-[10px] font-mono text-muted-foreground opacity-30 select-none">{idx + 1}</span>
                <h4 className="text-sm font-bold text-primary mb-2 leading-snug">{cue.keyword}</h4>
                <div className="h-0.5 w-4 bg-primary/20 mb-2 group-hover:w-8 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[70%] p-8 overflow-y-auto bg-background selection:bg-yellow-100 dark:selection:bg-yellow-900/30">
          <h3 className="text-xs font-black uppercase text-muted-foreground mb-6 tracking-widest flex items-center gap-2">
            <BookOpen className="w-3 h-3" /> Note-Taking Area
          </h3>
          <div className="space-y-8 text-base leading-relaxed text-foreground/90 font-serif">
            {content.cues?.map((cue, idx) => (
              <div key={idx} className="pb-6 border-b border-border/30 last:border-0 relative">
                <p className="whitespace-pre-line">{cue.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[25%] border-t-2 border-primary/10 bg-muted/20 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
            <Pencil className="w-3 h-3" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Summary</h3>
        </div>
        <p className="text-sm italic text-muted-foreground/80 leading-relaxed max-w-3xl">
          {content.summary}
        </p>
      </div>
    </div>
  );
};
