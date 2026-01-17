import { NoteContent } from "@/data/mockNotes";
import { cn } from "@/lib/utils";

export const OutlineNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-8 min-h-screen bg-background">
      <div className="mb-12 border-b pb-6">
        <h1 className="text-4xl font-black tracking-tight mb-2">{content.title}</h1>
        <p className="text-lg text-muted-foreground font-light">{content.courseId.toUpperCase()} • Outline Method</p>
      </div>

      <div className="space-y-8">
        {content.sections?.map((section, idx) => (
          <div key={idx} className="relative pl-6 border-l-2 border-border/50 hover:border-primary/50 transition-colors">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border border-primary/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            <h2 className={cn(
              "font-bold text-foreground mb-3",
              (section.level || 1) === 1 ? "text-2xl" : (section.level || 1) === 2 ? "text-xl ml-4" : "text-lg ml-8"
            )}>
              {section.heading}
            </h2>

            <div className={cn(
              "text-muted-foreground leading-relaxed mb-4",
              (section.level || 1) === 1 ? "" : (section.level || 1) === 2 ? "ml-4" : "ml-8"
            )}>
              {section.content}
            </div>

            {section.bullets && section.bullets.length > 0 && (
              <ul className={cn(
                "space-y-2 mb-4 list-disc marker:text-primary/50",
                (section.level || 1) === 1 ? "ml-6" : (section.level || 1) === 2 ? "ml-10" : "ml-14"
              )}>
                {section.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-foreground/80 pl-2">{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
