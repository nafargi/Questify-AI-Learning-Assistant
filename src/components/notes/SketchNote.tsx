import { NoteContent } from "@/data/mockNotes";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming this utility exists

export const SketchNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 bg-[#fdfbf7] dark:bg-[#1e1e1e] min-h-screen rounded-3xl" style={{ backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <h1 className="text-5xl font-black mb-12 text-center font-handwriting rotate-1 text-[#2d3436] dark:text-[#dfe6e9] drop-shadow-sm">
        {content.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.sketchSections?.map((section, i) => (
          <div key={i} className={cn(
            "relative p-6 rounded-2xl border-4 border-black/80 bg-white dark:bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transform transition-transform hover:-rotate-1 hover:scale-[1.02]",
            i % 2 === 0 ? "rotate-1" : "-rotate-1"
          )}>
            {/* Icon Circle */}
            <div className="absolute -top-6 -left-4 w-16 h-16 rounded-full bg-[#fdcb6e] border-4 border-black flex items-center justify-center text-3xl shadow-sm z-10">
              {section.icon}
            </div>

            <h2 className="text-2xl font-black ml-10 mb-4 font-handwriting text-primary uppercase tracking-wider">
              {section.title}
            </h2>

            <p className="text-lg font-medium leading-relaxed font-handwriting text-foreground/80 pl-2 border-l-4 border-primary/20">
              {section.content}
            </p>

            {/* Doodles Tagging */}
            <div className="mt-4 flex gap-2 justify-end opacity-50">
              {section.doodles?.map(d => (
                <span key={d} className="text-xs font-bold font-mono px-2 py-1 rounded bg-muted border border-black/10">
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
