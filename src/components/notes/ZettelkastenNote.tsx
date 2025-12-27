import { cn } from "@/lib/utils";
import { Link2, Plus, Hash, ArrowRight, Search } from "lucide-react";

interface ZettelkastenNoteProps {
  content: {
    notes: Array<{
      id: string;
      title: string;
      content: string;
      links: string[];
      tags: string[];
    }>;
  };
}

export function ZettelkastenNote({ content }: ZettelkastenNoteProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Zettelkasten
          </h3>
          <p className="text-sm text-muted-foreground">Interconnected atomic notes</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm">
            <Search className="w-4 h-4" />
            <span>Search notes...</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.notes.map((note, i) => (
          <div
            key={i}
            className={cn(
              "group relative rounded-2xl border-2 border-border bg-card p-5",
              "hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
            )}
          >
            {/* Note ID Badge */}
            <div className="absolute -top-3 left-4 px-3 py-1 bg-primary/10 text-primary text-xs font-mono font-bold rounded-full border border-primary/20">
              #{note.id}
            </div>

            {/* Title */}
            <h4 className="font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
              {note.title}
            </h4>

            {/* Content Preview */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {note.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, j) => (
                <span
                  key={j}
                  className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Link2 className="w-3 h-3" />
                Linked Notes:
              </p>
              <div className="flex flex-wrap gap-2">
                {note.links.map((link, j) => (
                  <button
                    key={j}
                    className="flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary text-xs rounded-lg hover:bg-primary/10 transition-colors group/link"
                  >
                    <span className="font-mono">#{link}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </button>
                ))}
                <button className="flex items-center gap-1 px-2 py-1 border border-dashed border-border text-muted-foreground text-xs rounded-lg hover:border-primary hover:text-primary transition-colors">
                  <Plus className="w-3 h-3" />
                  Link
                </button>
              </div>
            </div>

            {/* Connection visualization on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}

        {/* New Note Card */}
        <div className="rounded-2xl border-2 border-dashed border-border hover:border-primary/40 flex flex-col items-center justify-center min-h-[200px] cursor-pointer group transition-all duration-300 hover:bg-primary/5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <p className="font-medium text-muted-foreground group-hover:text-primary transition-colors">Create Atomic Note</p>
          <p className="text-xs text-muted-foreground mt-1">One idea per note</p>
        </div>
      </div>

      {/* Knowledge Graph Preview */}
      <div className="rounded-2xl border border-border bg-muted/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-sm text-foreground">Knowledge Graph</h4>
          <button className="text-xs text-primary hover:underline">View Full Graph</button>
        </div>
        <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
          <div className="flex items-center gap-8">
            {content.notes.slice(0, 3).map((note, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                  #{note.id}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-primary/30" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Each note = one atomic idea • Link related notes • Build your knowledge network
        </p>
      </div>
    </div>
  );
}
