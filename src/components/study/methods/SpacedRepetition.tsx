import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Timer } from "lucide-react";

export function SpacedRepetition({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Spaced Repetition"
            subtitle="Optimized Review Intervals"
            icon={Timer}
            color="text-orange-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Spaced Repetition Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
