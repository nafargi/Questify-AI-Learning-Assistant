import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Layers } from "lucide-react";

export function LeitnerSystem({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Leitner System"
            subtitle="Box-based Flashcards"
            icon={Layers}
            color="text-amber-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Leitner System Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
