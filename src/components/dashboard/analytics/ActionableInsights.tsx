import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightning, Sparkle, Info } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export function ActionableInsights() {
    const navigate = useNavigate();
    const insights = [
        {
            id: 1,
            type: "efficiency",
            text: "Your performance declines after 40 minutes of continuous study in 'Neural Networks'.",
            action: "Implement 5min micro-breaks every 35 minutes.",
            priority: "high"
        },
        {
            id: 2,
            type: "logic",
            text: "Conceptual gaps identified in 'Relational Algebra' during time-pressured exams.",
            action: "Execute targeted drill sessions in Study Room.",
            priority: "medium"
        },
        {
            id: 3,
            type: "retention",
            text: "Retention drop detected in 'Probability Theory' topics not reviewed for 4+ days.",
            action: "Schedule Spaced Repetition protocol.",
            priority: "high"
        }
    ];

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-4 bg-muted/5 border-b">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Smart Recommendations</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">Personalized tips to improve your learning</p>
                </div>
                <Sparkle className="w-5 h-5 text-primary" weight="fill" />
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {insights.map((insight, index) => (
                    <div key={insight.id} className="relative pl-5 border-l-2 border-border/50 group hover:border-primary transition-colors">
                        <div className={cn(
                            "absolute -left-[5px] top-1 w-2 h-2 rounded-full",
                            insight.priority === 'high' ? "bg-primary" : "bg-muted-foreground/30"
                        )} />
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-muted-foreground/60">Tip {index + 1}</span>
                                <div className="h-[1px] flex-1 bg-border/30" />
                            </div>
                            <p className="text-[12px] font-medium leading-relaxed text-foreground/90">
                                {insight.text}
                            </p>
                            <div className="flex items-center gap-2.5 p-3 bg-muted/20 border border-dashed rounded-lg transition-all group-hover:bg-muted/40">
                                <Lightning className="w-4 h-4 text-primary flex-shrink-0" weight="fill" />
                                <p className="text-[11px] font-semibold text-foreground/80">
                                    {insight.action}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-6 mt-6 border-t border-border/50 flex justify-end">
                    <Button
                        variant="outline"
                        className="h-10 px-6 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => {
                            toast.success("Recommendations applied to your study plan!");
                            navigate('/planner');
                        }}
                    >
                        Apply All Recommendations
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
