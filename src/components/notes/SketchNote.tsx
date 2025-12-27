import { cn } from "@/lib/utils";
import { Palette, Type, Shapes, Sparkles, Download } from "lucide-react";

interface SketchNoteProps {
  content: {
    title: string;
    sections: Array<{
      heading: string;
      notes: string[];
      icon: string;
    }>;
  };
}

export function SketchNote({ content }: SketchNoteProps) {
  const decorativeShapes = [
    "bg-primary/20 rounded-full",
    "bg-secondary/20 rounded-xl rotate-12",
    "bg-accent/20 rounded-lg -rotate-6",
    "bg-warning/20 rounded-2xl rotate-3",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            Sketchnotes
          </h3>
          <p className="text-sm text-muted-foreground">Visual notes with drawings, icons, and creative layouts</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Palette className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Type className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Shapes className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sketchnote Canvas */}
      <div className="relative rounded-2xl border-2 border-border bg-gradient-to-br from-amber-50/50 via-background to-rose-50/50 dark:from-amber-950/20 dark:to-rose-950/20 p-8 min-h-[600px] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-200/30 dark:bg-yellow-800/20 rounded-full blur-xl" />

        {/* Title Banner */}
        <div className="relative text-center mb-10">
          <div className="inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl -rotate-1" />
            <h2 className="relative text-3xl font-bold text-foreground px-8 py-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {content.title}
            </h2>
            {/* Decorative underline */}
            <svg className="w-full h-4 -mt-2" viewBox="0 0 200 20">
              <path d="M10 15 Q50 5 100 15 Q150 25 190 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.sections.map((section, i) => (
            <div
              key={i}
              className={cn(
                "relative p-6 rounded-2xl border-2 border-dashed transition-transform hover:scale-[1.02]",
                i % 2 === 0 ? "border-primary/40 rotate-1" : "border-secondary/40 -rotate-1"
              )}
            >
              {/* Section Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg transform -rotate-6">
                {section.icon}
              </div>

              {/* Section Heading */}
              <h3 className="text-lg font-bold text-foreground mb-4 ml-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {section.heading}
              </h3>

              {/* Decorative divider */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                <span className="text-primary">✦</span>
                <div className="flex-1 h-0.5 bg-gradient-to-l from-secondary/30 to-transparent" />
              </div>

              {/* Notes */}
              <div className="space-y-3">
                {section.notes.map((note, j) => (
                  <div key={j} className="flex items-start gap-3">
                    {/* Bullet point as hand-drawn circle */}
                    <div className="w-4 h-4 rounded-full border-2 border-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8">
                <svg viewBox="0 0 40 40">
                  <path d="M35 5 L35 35 L5 35" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center gap-4 mt-10">
          {['⭐', '💡', '🎯', '✨', '🔥'].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl animate-bounce-slow"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')] opacity-[0.02] pointer-events-none" />
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Add drawings, icons, and colors • Create visual hierarchy • Make notes memorable and fun!
        </p>
      </div>
    </div>
  );
}
