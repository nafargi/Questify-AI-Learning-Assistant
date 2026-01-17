import { NoteContent } from "@/data/mockNotes";
import { cn } from "@/lib/utils";

export const BoxingNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <h1 className="text-4xl font-black mb-10 text-center tracking-tight">{content.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
        {content.boxes?.map((box, i) => (
          <div
            key={i}
            className={cn(
              "border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col",
              box.color
            )}
          >
            <div className="p-4 border-b border-black/5 bg-black/5 backdrop-blur-sm">
              <h3 className="font-black text-lg uppercase tracking-wide">{box.title}</h3>
            </div>
            <div className="p-6 flex-1 bg-white/50 dark:bg-black/20">
              <ul className="space-y-3">
                {box.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-sm bg-current mt-2 opacity-60" />
                    <span className="font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
