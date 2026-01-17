import { StudySessionLayout } from "@/components/study/StudySessionLayout";
import { Search } from "lucide-react";

export function SQ3RMethod({ onBack }: { onBack: () => void }) {
    return (
        <StudySessionLayout
            title="SQ3R Method"
            subtitle="Survey, Question, Read, Recite, Review"
            icon={Search}
            color="text-purple-500"
            onExit={onBack}
        >
            <div className="flex items-center justify-center h-full text-muted-foreground">
                SQ3R Method Module - Coming Soon
            </div>
        </StudySessionLayout>
    );
}
