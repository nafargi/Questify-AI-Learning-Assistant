import { NoteContent } from "@/data/mockNotes";
import { cn } from "@/lib/utils";

export const MindMapNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[600px] w-full overflow-x-auto">
      {/* Center Node */}
      <div className="relative z-10 w-48 h-48 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-center p-4 font-black text-xl shadow-2xl border-4 border-white/20 ring-4 ring-primary/10 animate-fade-in hover:scale-105 transition-transform">
        {content.center || content.title}
      </div>

      {/* Branches Container - Simplistic Radial Mock */}
      <div className="flex flex-wrap justify-center gap-8 mt-16 w-full max-w-7xl">
        {content.branches?.map((branch, i) => (
          <div key={i} className="flex flex-col items-center flex-1 min-w-[250px] relative pointer-events-none">
            {/* Visual Connector Line */}
            <div className={cn("w-1 h-16 mb-4", branch.color.split(' ')[0].replace('text', 'bg'))} />

            {/* Branch Node */}
            <div className={cn(
              "pointer-events-auto p-6 rounded-2xl border shadow-lg w-full transition-all hover:-translate-y-1 hover:shadow-xl",
              branch.color
            )}>
              <h3 className="font-black text-lg mb-4 text-center pb-2 border-b border-black/10 uppercase tracking-widest">{branch.title}</h3>
              <ul className="space-y-2">
                {branch.items.map((item, idx) => (
                  <li key={idx} className="font-medium text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Sub-branches */}
              {branch.subBranches?.map((sub, sIdx) => (
                <div key={sIdx} className="mt-4 pt-4 border-t border-black/10">
                  <h4 className="font-bold text-xs uppercase opacity-70 mb-2">{sub.title}</h4>
                  <ul className="space-y-1 pl-2">
                    {sub.items.map((subItem, si) => (
                      <li key={si} className="text-xs opacity-90">• {subItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
