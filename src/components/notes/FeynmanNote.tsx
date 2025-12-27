import { cn } from "@/lib/utils";
import { Lightbulb, AlertCircle, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";

interface FeynmanNoteProps {
  content: {
    concept: string;
    simpleExplanation: string;
    gaps: string[];
    refinedExplanation: string;
  };
}

export function FeynmanNote({ content }: FeynmanNoteProps) {
  const steps = [
    { number: 1, title: "Choose Concept", icon: Lightbulb, color: "from-yellow-500 to-orange-500" },
    { number: 2, title: "Explain Simply", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { number: 3, title: "Identify Gaps", icon: AlertCircle, color: "from-red-500 to-rose-500" },
    { number: 4, title: "Refine & Simplify", icon: RefreshCw, color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Feynman Technique
          </h3>
          <p className="text-sm text-muted-foreground">"If you can't explain it simply, you don't understand it well enough."</p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex items-center justify-between bg-muted/30 rounded-2xl p-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                `bg-gradient-to-br ${step.color}`
              )}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-muted-foreground mt-2 text-center max-w-[80px]">{step.title}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-muted-foreground mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Concept */}
      <div className="rounded-2xl border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
            1
          </div>
          <h4 className="font-bold text-foreground">Concept to Master</h4>
        </div>
        <div className="p-4 bg-card rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-lg font-semibold text-foreground">{content.concept}</p>
        </div>
      </div>

      {/* Step 2: Simple Explanation */}
      <div className="rounded-2xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
            2
          </div>
          <h4 className="font-bold text-foreground">Explain Like I'm 10</h4>
          <span className="text-xs text-muted-foreground bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">No jargon allowed!</span>
        </div>
        <div className="p-4 bg-card rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-foreground leading-relaxed">{content.simpleExplanation}</p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Use analogies, examples, and everyday language</span>
        </div>
      </div>

      {/* Step 3: Identify Gaps */}
      <div className="rounded-2xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-bold">
            3
          </div>
          <h4 className="font-bold text-foreground">Knowledge Gaps Found</h4>
          <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">{content.gaps.length} gaps</span>
        </div>
        <div className="space-y-3">
          {content.gaps.map((gap, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-red-200 dark:border-red-800">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{gap}</p>
              </div>
              <button className="text-xs text-red-600 hover:text-red-700 font-medium">Review →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: Refined Explanation */}
      <div className="rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
            4
          </div>
          <h4 className="font-bold text-foreground">Refined Explanation</h4>
          <span className="text-xs text-muted-foreground bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">After filling gaps</span>
        </div>
        <div className="p-4 bg-card rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-foreground leading-relaxed">{content.refinedExplanation}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-4 h-4 text-blue-500" />
            <span>Repeat until crystal clear</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Iterate Again
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 The Feynman Technique reveals what you truly understand vs. what you only think you understand
        </p>
      </div>
    </div>
  );
}
