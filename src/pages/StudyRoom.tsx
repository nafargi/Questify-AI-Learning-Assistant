import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StudyMethodId } from "@/types/study";
import { StudyMethodSelector } from "@/components/study/StudyMethodSelector";
import { StandardReadMethod } from "@/components/study/methods/StandardReadMethod";
import { PomodoroMethod } from "@/components/study/methods/PomodoroMethod";
import { FeynmanMethod } from "@/components/study/methods/FeynmanMethod";
import { SQ3RMethod } from "@/components/study/methods/SQ3RMethod";
import { BlurtingMethod } from "@/components/study/methods/BlurtingMethod";
import { LeitnerSystem } from "@/components/study/methods/LeitnerSystem";
import { TeachingSimulation } from "@/components/study/methods/TeachingSimulation";
import { SpacedRepetition } from "@/components/study/methods/SpacedRepetition";
import { ActiveRecall } from "@/components/study/methods/ActiveRecall";
import { InterleavedPractice } from "@/components/study/methods/InterleavedPractice";
import { ReverseLearning } from "@/components/study/methods/ReverseLearning";

const GenericMethod = ({ name }: { name: string }) => <div className="p-10 text-center">{name} Method Coming Soon</div>;

export default function StudyRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chapterId, courseId } = location.state || {};

  const [activeMethod, setActiveMethod] = useState<StudyMethodId | null>(null);

  if (!activeMethod) {
    return <StudyMethodSelector onSelect={setActiveMethod} />;
  }

  const renderMethod = () => {
    const commonProps = {
      chapterId: chapterId || "demo-chapter",
      courseId: courseId || "demo-course",
      onBack: () => setActiveMethod(null)
    };

    switch (activeMethod) {
      case 'standard':
        return <StandardReadMethod {...commonProps} />;
      case 'pomodoro':
        return <PomodoroMethod {...commonProps} />;
      case 'feynman':
        return <FeynmanMethod {...commonProps} />;
      case 'sq3r':
        return <SQ3RMethod {...commonProps} />;
      case 'blurting':
        return <BlurtingMethod {...commonProps} />;
      case 'leitner':
        return <LeitnerSystem {...commonProps} />;
      case 'teaching':
        return <TeachingSimulation {...commonProps} />;
      case 'spaced_repetition':
        return <SpacedRepetition {...commonProps} />;
      case 'active_recall':
        return <ActiveRecall {...commonProps} />;
      case 'interleaved':
        return <InterleavedPractice {...commonProps} />;
      case 'reverse_learning':
        return <ReverseLearning {...commonProps} />;
      default:
        return <GenericMethod name={activeMethod} />;
    }
  };

  return renderMethod();
}

