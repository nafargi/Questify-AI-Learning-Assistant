import { NoteContent } from "@/data/mockNotes";
import { cn } from "@/lib/utils";

export const SentenceNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 lg:p-12 bg-white dark:bg-[#1a1a1a] shadow-sm min-h-screen">
      <h1 className="text-3xl font-bold mb-2 font-serif text-foreground">{content.title}</h1>
      <div className="flex gap-4 mb-12 text-sm text-muted-foreground border-b pb-4">
        <span>{content.courseId}</span>
        <span>|</span>
        <span>{content.date}</span>
      </div>

      <div className="space-y-6">
        {content.sections?.map((section, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="font-mono text-muted-foreground/50 select-none pt-1 text-sm group-hover:text-primary transition-colors">
              {(i + 1).toString().padStart(2, '0')}.
            </span>
            <p className="text-lg leading-relaxed font-serif text-foreground/90 pb-4 border-b border-dashed border-border/30 w-full group-hover:bg-muted/30 px-2 rounded-md transition-colors">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
