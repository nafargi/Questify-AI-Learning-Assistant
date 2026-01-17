import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Sparkles } from "lucide-react";

export function BlurtingMethod({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="Blurting Method"
            subtitle="Active Recall Writing"
            icon={Sparkles}
            color="text-pink-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Blurting Method Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
