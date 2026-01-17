import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { BrainCircuit } from "lucide-react";

export function TeachingSimulation({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Teaching Simulation"
            subtitle="Mock Student Interaction"
            icon={BrainCircuit}
            color="text-teal-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Teaching Simulation Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
