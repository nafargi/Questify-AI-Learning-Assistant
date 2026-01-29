import { NoteContent } from "@/data/mockNotes";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Warning, ArrowRight, Lightbulb, User } from "@phosphor-icons/react";

export const FeynmanNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-black tracking-tighter">{content.title}</h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
          <User className="w-4 h-4" />
          Explain it to a 5-year-old
        </div>
      </div>

      <div className="grid gap-8">
        {/* The Concept */}
        <Card className="p-8 border border-primary/20 bg-primary/5">
          <h2 className="text-xs font-black uppercase text-primary tracking-widest mb-4">The Concept</h2>
          <p className="text-2xl font-bold font-serif italic text-foreground/90">
            "{content.concept}"
          </p>
        </Card>

        {/* Simple Explanation */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-border -z-10" />

          <div className="flex gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg mt-2">
              <span className="text-2xl font-black">1</span>
            </div>
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold">Simple Explanation</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {content.simpleExplanation}
              </p>
              {content.analogy && (
                <div className="p-4 rounded-xl bg-muted border border-dashed flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0" />
                  <div>
                    <span className="font-bold text-sm block mb-1">Analogy</span>
                    <p className="text-sm italic">{content.analogy}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Knowledge Gaps */}
        <div className="flex gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 text-white flex items-center justify-center shrink-0 shadow-lg mt-2">
            <span className="text-2xl font-black">2</span>
          </div>
          <div className="space-y-4 pt-2 w-full">
            <h3 className="text-xl font-bold">Identified Gaps</h3>
            <div className="grid gap-3">
              {content.gaps?.map((gap, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                  <Warning className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Refined */}
        <div className="flex gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg mt-2">
            <span className="text-2xl font-black">3</span>
          </div>
          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold">Refined Definition</h3>
            <p className="text-lg leading-relaxed font-medium">
              {content.refinedExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
