import { cn } from "@/lib/utils";
import { Plus, GripVertical, Trash2 } from "lucide-react";

interface SentenceNoteProps {
  content: {
    sentences: string[];
  };
}

export function SentenceNote({ content }: SentenceNoteProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground">Sentence Method</h3>
          <p className="text-sm text-muted-foreground">One idea per line, numbered for quick reference</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{content.sentences.length} sentences</span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Line
          </button>
        </div>
      </div>

      {/* Notebook Style Container */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-lg">
        {/* Notebook Header */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 px-6 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-muted-foreground">Quick Capture Mode</span>
        </div>

        {/* Sentences List */}
        <div className="divide-y divide-border">
          {content.sentences.map((sentence, i) => (
            <div
              key={i}
              className={cn(
                "group flex items-start gap-4 px-6 py-4 transition-colors",
                "hover:bg-muted/30 cursor-pointer",
                i % 2 === 0 ? "bg-background" : "bg-muted/10"
              )}
            >
              {/* Drag Handle */}
              <GripVertical className="w-4 h-4 text-muted-foreground/50 mt-1 opacity-0 group-hover:opacity-100 cursor-grab transition-opacity" />

              {/* Number */}
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{i + 1}</span>
              </div>

              {/* Sentence */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">{sentence}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Line */}
          <div className="px-6 py-4 bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-muted-foreground">{content.sentences.length + 1}</span>
              </div>
              <input
                type="text"
                placeholder="Type a new sentence..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-muted/30 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{content.sentences.length}</p>
          <p className="text-xs text-muted-foreground">Total Sentences</p>
        </div>
        <div className="rounded-xl bg-muted/30 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {content.sentences.reduce((acc, s) => acc + s.split(' ').length, 0)}
          </p>
          <p className="text-xs text-muted-foreground">Total Words</p>
        </div>
        <div className="rounded-xl bg-muted/30 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {Math.round(content.sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / content.sentences.length)}
          </p>
          <p className="text-xs text-muted-foreground">Avg Words/Line</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Perfect for fast-paced lectures • One new fact per line • Easy to review and reorganize
        </p>
      </div>
    </div>
  );
}
