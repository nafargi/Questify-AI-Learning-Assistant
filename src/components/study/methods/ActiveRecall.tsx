import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { BrainCircuit } from "lucide-react";

export function ActiveRecall({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Active Recall"
            subtitle="Testing Phase"
            icon={BrainCircuit}
            color="text-rose-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Active Recall Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
