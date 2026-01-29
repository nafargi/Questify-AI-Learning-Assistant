import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionAnalysisBlock } from "./QuestionAnalysisBlock";
import {
    TrendUp,
    Clock,
    Target,
    ArrowRight
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockWeakPointAnalysis, type WeakPointAnalysis } from "@/data/mockWeakPointAnalysis";

interface WeakPointAnalysisViewProps {
    // In real implementation, this would come from exam results
    // For now, we'll use mock data
    results?: any;
    questions?: any[];
    answers?: any;
}

export function WeakPointAnalysisView({ results, questions, answers }: WeakPointAnalysisViewProps) {
    const navigate = useNavigate();
    const analysis: WeakPointAnalysis = mockWeakPointAnalysis;

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* 1. Overall Summary */}
                <Card className="border-l-4 border-l-warning">
                    <CardContent className="p-6">
                        <p className="text-base text-foreground/90 leading-relaxed">
                            {analysis.summary.tone}
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Question-by-Question Analysis */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <h2 className="text-lg font-bold">Detailed Analysis</h2>
                    </div>

                    {analysis.questionAnalyses.map((questionAnalysis) => (
                        <QuestionAnalysisBlock
                            key={questionAnalysis.questionId}
                            analysis={questionAnalysis}
                        />
                    ))}
                </div>

                {/* 3. Pattern Detection */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <TrendUp className="w-5 h-5 text-primary" weight="bold" />
                            <CardTitle className="text-base">Pattern Analysis</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Repeated Concepts */}
                        {analysis.patterns.repeatedConcepts.length > 0 && (
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                                <p className="text-xs font-semibold text-foreground/70 mb-2">Repeated concept failures</p>
                                <p className="text-sm text-foreground/80">
                                    {analysis.patterns.repeatedConcepts.join(", ")}
                                </p>
                            </div>
                        )}

                        {/* Time-Related Weaknesses */}
                        {analysis.patterns.timeRelatedWeaknesses && (
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-secondary mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground/70 mb-2">Time pressure impact</p>
                                        <p className="text-sm text-foreground/80">
                                            Performance declines when answering quickly. Consider slowing down to verify answers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Difficulty Mismatch */}
                        {analysis.patterns.difficultyMismatch && (
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                                <div className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground/70 mb-2">Difficulty pattern</p>
                                        <p className="text-sm text-foreground/80">
                                            {analysis.patterns.difficultyMismatch}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Confidence Gap */}
                        {analysis.patterns.confidenceGap && (
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                                <p className="text-xs font-semibold text-foreground/70 mb-2">Confidence vs performance</p>
                                <p className="text-sm text-foreground/80">
                                    {analysis.patterns.confidenceGap}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 4. Recommended Learning Path */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 text-primary" weight="bold" />
                            <CardTitle className="text-base">Recommended Learning Path</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {analysis.learningPath.map((step, index) => (
                                <div key={step.order} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <p className="text-sm font-semibold text-foreground/90 mb-1.5">
                                            {step.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {step.reason}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate('/exam')}
                    >
                        Take Another Exam
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={() => navigate('/study-room')}
                    >
                        Start Learning Path
                    </Button>
                </div>
            </div>
        </div>
    );
}
