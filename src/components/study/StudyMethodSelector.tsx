import {
    BookOpen,
    Timer,
    MessageSquare,
    Search,
    BrainCircuit,
    Layers,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { StudyMethodConfig, StudyMethodId } from "@/types/study";
import { cn } from "@/lib/utils";

const METHODS: StudyMethodConfig[] = [
    // --- Phase 1: Teaching & Analysis ---
    {
        id: 'feynman',
        label: "Feynman Method",
        description: "Learn by teaching. Simplify concepts to test your understanding.",
        icon: MessageSquare,
        color: "text-green-500",
        gradient: "from-green-500/20 to-emerald-500/20",
        badge: "Deep Learning",
        recommendedFor: ["Complex topics", "Concept Mastery"]
    },
    {
        id: 'teaching',
        label: "Teaching Simulation",
        description: "Interact with an AI student who asks you questions about the topic.",
        icon: BrainCircuit,
        color: "text-teal-500",
        gradient: "from-teal-500/20 to-cyan-500/20",
        recommendedFor: ["Verbal processing", "Testing gaps"]
    },

    // --- Phase 2: Recall & Memory ---
    {
        id: 'leitner',
        label: "Leitner System",
        description: "Spaced repetition using flashcards sorted into proficiency boxes.",
        icon: Layers,
        color: "text-amber-500",
        gradient: "from-amber-500/20 to-yellow-500/20",
        recommendedFor: ["Memorization", "Definitions"]
    },
    {
        id: 'spaced_repetition',
        label: "Spaced Repetition",
        description: "Review content at scientifically optimal intervals to prevent forgetting.",
        icon: Timer,
        color: "text-orange-500",
        gradient: "from-orange-500/20 to-red-500/20",
        recommendedFor: ["Long-term retention", "Large datasets"]
    },
    {
        id: 'active_recall',
        label: "Active Recall",
        description: "Test yourself constantly before re-reading the material.",
        icon: BrainCircuit,
        color: "text-rose-500",
        gradient: "from-rose-500/20 to-pink-500/20",
        badge: "High Efficiency",
        recommendedFor: ["Exam prep", "Quick checks"]
    },

    // --- Phase 3: Deep Work ---
    {
        id: 'pomodoro',
        label: "Pomodoro Focus",
        description: "25-minute sprints of focused study followed by 5-minute breaks.",
        icon: Timer,
        color: "text-blue-500",
        gradient: "from-blue-500/20 to-indigo-500/20",
        recommendedFor: ["Procrastination", "Burnout prevention"]
    },
    {
        id: 'sq3r',
        label: "SQ3R Method",
        description: "Survey, Question, Read, Recite, Review. A systematic reading approach.",
        icon: Search,
        color: "text-purple-500",
        gradient: "from-purple-500/20 to-violet-500/20",
        recommendedFor: ["Textbooks", "Research papers"]
    },
    {
        id: 'blurting',
        label: "Blurting Method",
        description: "Read a section, close it, and write down everything you remember.",
        icon: Sparkles,
        color: "text-pink-500",
        gradient: "from-pink-500/20 to-fuchsia-500/20",
        recommendedFor: ["Identifying gaps", "Essay prep"]
    },

    // --- Phase 4: Creative & Structural ---
    {
        id: 'interleaved',
        label: "Interleaved Practice",
        description: "Mix different topics together in one session to improve discrimination.",
        icon: Layers,
        color: "text-indigo-500",
        gradient: "from-indigo-500/20 to-purple-500/20",
        recommendedFor: ["Math", "Similar concepts"]
    },
    {
        id: 'reverse_learning',
        label: "Reverse Learning",
        description: "Start with the solution/conclusion and work backwards to the principles.",
        icon: ArrowRight,
        color: "text-cyan-500",
        gradient: "from-cyan-500/20 to-sky-500/20",
        recommendedFor: ["Problem solving", "Debugging"]
    }
];

interface StudyMethodSelectorProps {
    onSelect: (method: StudyMethodId) => void;
}

export function StudyMethodSelector({ onSelect }: StudyMethodSelectorProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            <div className="relative z-10 max-w-5xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center space-y-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/10 animate-in fade-in zoom-in duration-500"
                    >
                        <Sparkles className="w-3 h-3" />
                        Study Architecture
                    </div>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Methodology</span>
                    </h1>
                    <p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
                    >
                        Select a scientifically proven study technique tailored to your current goal.
                        We'll adapt the interface to match your workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {METHODS.map((method, index) => (
                        <MethodCard
                            key={method.id}
                            method={method}
                            delayClass={`delay-[${(index * 100) + 300}ms]`}
                            onClick={() => onSelect(method.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MethodCard({ method, onClick, delayClass }: { method: StudyMethodConfig; onClick: () => void; delayClass: string }) {
    const Icon = method.icon;

    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative flex flex-col text-left h-full p-6 rounded-3xl border bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both",
                delayClass
            )}
        >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br", method.gradient)} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-3 rounded-2xl bg-background/80 shadow-sm ring-1 ring-inset ring-black/5", method.color)}>
                        <Icon className="w-8 h-8" />
                    </div>
                    {method.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                            {method.badge}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {method.label}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {method.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                        {method.recommendedFor?.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-xs font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Start Session <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                </div>
            </div>
        </button>
    );
}
