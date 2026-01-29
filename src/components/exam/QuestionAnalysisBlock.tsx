import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Warning,
    Clock,
    CheckCircle,
    XCircle,
    ArrowRight,
    Books,
    Exam,
    Note
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { QuestionAnalysis, WeakPointActionItem } from "@/data/mockWeakPointAnalysis";

interface QuestionAnalysisBlockProps {
    analysis: QuestionAnalysis;
}

export function QuestionAnalysisBlock({ analysis }: QuestionAnalysisBlockProps) {
    const navigate = useNavigate();

    const handleAction = (action: WeakPointActionItem) => {
        switch (action.type) {
            case "study":
                toast.success(`Opening study materials for: ${action.targetConcept}`);
                navigate('/study-room');
                break;
            case "practice":
                toast.success(`Starting practice session: ${action.targetConcept}`);
                navigate('/study-room');
                break;
            case "notes":
                toast.success(`Creating notes for: ${action.targetConcept}`);
                navigate('/notes');
                break;
            case "exam":
                toast.success(`Generating focused exam: ${action.targetConcept}`);
                navigate('/exam');
                break;
        }
    };

    const getWeakPointColor = (type: string) => {
        switch (type) {
            case "conceptual": return "text-destructive";
            case "partial": return "text-warning";
            case "time-pressure": return "text-secondary";
            case "misapplied": return "text-orange-600";
            case "false-confidence": return "text-purple-600";
            default: return "text-muted-foreground";
        }
    };

    const getWeakPointLabel = (type: string) => {
        switch (type) {
            case "conceptual": return "Conceptual Gap";
            case "partial": return "Partial Understanding";
            case "time-pressure": return "Time Pressure";
            case "misapplied": return "Misapplied Rule";
            case "false-confidence": return "False Confidence";
            default: return type;
        }
    };

    return (
        <Card className="border-l-4 border-l-destructive/50">
            <CardContent className="p-6 space-y-6">
                {/* A. Question Context */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">Q{analysis.questionNumber}</Badge>
                        <span className="text-sm font-semibold">{analysis.conceptTested}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{analysis.timeSpent}s / {analysis.expectedTime}s</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">{analysis.difficulty}</Badge>
                    </div>
                </div>

                {/* B. Correct Answer */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Correct answer:</p>
                    <p className="text-sm font-medium text-foreground/90">{analysis.correctAnswer}</p>
                </div>

                {/* C. Deep Weak Point Analysis */}
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <Warning className={cn("w-5 h-5 mt-0.5 flex-shrink-0", getWeakPointColor(analysis.weakPointType))} weight="fill" />
                        <div className="flex-1">
                            <p className={cn("text-xs font-bold mb-2", getWeakPointColor(analysis.weakPointType))}>
                                {getWeakPointLabel(analysis.weakPointType)}
                            </p>
                            <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                                {analysis.mentalStepMissed}
                            </p>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {analysis.explanation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* D. Concept Decomposition */}
                <div>
                    <h4 className="text-xs font-semibold text-foreground/70 mb-3">Concept Map</h4>
                    <div className="grid grid-cols-3 gap-3">
                        {/* You Know */}
                        <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                            <div className="flex items-center gap-1.5 mb-2">
                                <CheckCircle className="w-3.5 h-3.5 text-success" weight="fill" />
                                <span className="text-xs font-semibold text-success">You know</span>
                            </div>
                            <ul className="space-y-1.5">
                                {analysis.conceptMap.studentKnows.map((item, i) => (
                                    <li key={i} className="text-xs text-foreground/70 leading-snug">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Unstable */}
                        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Warning className="w-3.5 h-3.5 text-warning" weight="fill" />
                                <span className="text-xs font-semibold text-warning">Unstable</span>
                            </div>
                            <ul className="space-y-1.5">
                                {analysis.conceptMap.unstable.map((item, i) => (
                                    <li key={i} className="text-xs text-foreground/70 leading-snug">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Missing */}
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                            <div className="flex items-center gap-1.5 mb-2">
                                <XCircle className="w-3.5 h-3.5 text-destructive" weight="fill" />
                                <span className="text-xs font-semibold text-destructive">Missing</span>
                            </div>
                            <ul className="space-y-1.5">
                                {analysis.conceptMap.missing.map((item, i) => (
                                    <li key={i} className="text-xs text-foreground/70 leading-snug">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* E. Interactive Actions */}
                <div>
                    <h4 className="text-xs font-semibold text-foreground/70 mb-3">Recommended Actions</h4>
                    <div className="flex flex-wrap gap-2">
                        {analysis.nextActions.map((action) => (
                            <Button
                                key={action.id}
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction(action)}
                                className="text-xs h-8"
                            >
                                {action.type === 'study' && <Books className="w-3.5 h-3.5 mr-1.5" />}
                                {action.type === 'exam' && <Exam className="w-3.5 h-3.5 mr-1.5" />}
                                {action.type === 'notes' && <Note className="w-3.5 h-3.5 mr-1.5" />}
                                {action.type === 'practice' && <ArrowRight className="w-3.5 h-3.5 mr-1.5" />}
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
