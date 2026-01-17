import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Layers } from "lucide-react";

export function InterleavedPractice({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Interleaved Practice"
            subtitle="Mixed Topic Study"
            icon={Layers}
            color="text-indigo-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Interleaved Practice Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
