import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { ArrowRight } from "lucide-react";

export function ReverseLearning({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Reverse Learning"
            subtitle="Solution First Approach"
            icon={ArrowRight}
            color="text-cyan-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Reverse Learning Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
