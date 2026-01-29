import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function TimeAllocation() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data = [
        { activity: "Studying", hours: 45, color: "hsl(var(--primary))" },
        { activity: "Examining", hours: 25, color: "hsl(var(--secondary))" },
        { activity: "Reviewing", hours: 15, color: "hsl(var(--accent))" },
        { activity: "Planning", hours: 10, color: "hsl(var(--muted-foreground)/0.2)" },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 500;
            const height = 150;
            const margin = { top: 10, right: 30, bottom: 30, left: 30 };

            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const total = d3.sum(data, d => d.hours);
            let cumulative = 0;

            const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

            const x = d3.scaleLinear().domain([0, total]).range([0, width - margin.left - margin.right]);

            data.forEach((d) => {
                g.append("rect")
                    .attr("x", x(cumulative))
                    .attr("y", 20)
                    .attr("width", x(d.hours))
                    .attr("height", 40)
                    .attr("fill", d.color)
                    .attr("class", "sharp-corners");

                // Label
                if (x(d.hours) > 40) {
                    g.append("text")
                        .attr("x", x(cumulative) + x(d.hours) / 2)
                        .attr("y", 80)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .attr("font-weight", "700")
                        .attr("class", "fill-muted-foreground")
                        .text(d.activity);

                    g.append("text")
                        .attr("x", x(cumulative) + x(d.hours) / 2)
                        .attr("y", 50)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "10px")
                        .attr("font-weight", "900")
                        .attr("class", "fill-background")
                        .text(`${Math.round((d.hours / total) * 100)}%`);
                }

                cumulative += d.hours;
            });

            // Time indicators
            const timeScale = d3.scaleLinear().domain([0, total]).range([0, width - margin.left - margin.right]);
            g.append("g")
                .attr("transform", `translate(0, 10)`)
                .call(d3.axisTop(timeScale).ticks(5).tickFormat(d => `${d}h`))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").attr("stroke", "hsl(var(--muted-foreground)/0.1)"))
                .call(g => g.selectAll(".tick text").attr("font-size", "10px").attr("font-weight", "700").attr("class", "fill-muted-foreground/60"));
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm lg:col-span-3 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Time Allocation</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">How you spend your study time</p>
                </div>
                <Clock className="w-5 h-5 text-primary" weight="bold" />
            </CardHeader>
            <CardContent className="pt-6">
                <svg ref={d3Container} viewBox="0 0 500 150" className="w-full h-auto" />
                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-muted-foreground">Focus Score</span>
                            <span className="text-sm font-bold text-primary">8.4/10</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-muted-foreground">Efficiency Change</span>
                            <span className="text-sm font-bold text-green-600">+15.2%</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/planner')}
                    >
                        Optimize Schedule
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
