import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface DataPoint {
    axis: string;
    value: number;
}

export function LearningHealthOverview() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data: DataPoint[] = [
        { axis: "Mastery", value: 0.85 },
        { axis: "Accuracy", value: 0.72 },
        { axis: "Consistency", value: 0.90 },
        { axis: "Focus", value: 0.65 },
        { axis: "Retention", value: 0.78 }
    ];

    useEffect(() => {
        if (d3Container.current) {
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const width = 300;
            const height = 300;
            const margin = 40;
            const radius = Math.min(width, height) / 2 - margin;

            const g = svg.append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const angleStep = (Math.PI * 2) / data.length;

            const rScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, radius]);

            // Grids
            const levels = 5;
            for (let i = 1; i <= levels; i++) {
                const r = (radius / levels) * i;
                g.append("circle")
                    .attr("fill", "none")
                    .attr("stroke", "hsl(var(--muted-foreground)/0.1)")
                    .attr("r", r);
            }

            // Axis lines
            data.forEach((d, i) => {
                const x = Math.cos(angleStep * i - Math.PI / 2) * radius;
                const y = Math.sin(angleStep * i - Math.PI / 2) * radius;
                g.append("line")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", x)
                    .attr("y2", y)
                    .attr("stroke", "hsl(var(--muted-foreground)/0.2)")
                    .attr("stroke-dasharray", "2,2");

                // Labels
                g.append("text")
                    .attr("x", Math.cos(angleStep * i - Math.PI / 2) * (radius + 20))
                    .attr("y", Math.sin(angleStep * i - Math.PI / 2) * (radius + 20))
                    .attr("text-anchor", "middle")
                    .attr("alignment-baseline", "middle")
                    .attr("font-size", "11px")
                    .attr("font-weight", "700")
                    .attr("class", "fill-muted-foreground")
                    .text(d.axis);
            });

            // Polygon
            const radarLine = d3.lineRadial<DataPoint>()
                .radius(d => rScale(d.value))
                .angle((d, i) => i * angleStep)
                .curve(d3.curveLinearClosed);

            g.append("path")
                .datum(data)
                .attr("d", radarLine)
                .attr("fill", "hsl(var(--primary)/0.2)")
                .attr("stroke", "hsl(var(--primary))")
                .attr("stroke-width", 2);

            // Points
            data.forEach((d, i) => {
                g.append("circle")
                    .attr("cx", Math.cos(angleStep * i - Math.PI / 2) * rScale(d.value))
                    .attr("cy", Math.sin(angleStep * i - Math.PI / 2) * rScale(d.value))
                    .attr("r", 4)
                    .attr("fill", "hsl(var(--background))")
                    .attr("stroke", "hsl(var(--primary))")
                    .attr("stroke-width", 2);
            });
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm transition-all hover:bg-card shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Your Learning Health</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">Track your progress across key areas</p>
                </div>
                <Target className="w-5 h-5 text-primary" weight="bold" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
                <svg ref={d3Container} width={300} height={350} />

                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-muted-foreground">Status</span>
                            <span className="text-sm font-bold text-green-600">Optimal</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-muted-foreground">Change</span>
                            <span className="text-sm font-bold text-primary">+12.4%</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/study-room')}
                    >
                        Improve Weak Areas
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
