import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, Clock } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

/* --- PERFORMANCE TRENDS --- */
export function PerformanceTrends() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data = [
        { date: "2024-01-01", accuracy: 65, time: 45, difficulty: 40 },
        { date: "2024-01-05", accuracy: 68, time: 42, difficulty: 45 },
        { date: "2024-01-10", accuracy: 75, time: 38, difficulty: 55 },
        { date: "2024-01-15", accuracy: 72, time: 40, difficulty: 60 },
        { date: "2024-01-20", accuracy: 82, time: 35, difficulty: 65 },
        { date: "2024-01-25", accuracy: 78, time: 36, difficulty: 70 },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 600;
            const height = 300;
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };

            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const x = d3.scalePoint()
                .domain(data.map(d => d.date))
                .range([margin.left, width - margin.right]);

            const y = d3.scaleLinear()
                .domain([0, 100])
                .range([height - margin.bottom, margin.top]);

            // Grids
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSize(-height + margin.top + margin.bottom).tickPadding(10))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").attr("stroke", "hsl(var(--muted-foreground)/0.05)"))
                .call(g => g.selectAll(".tick text").attr("font-size", "10px").attr("font-weight", "700").attr("class", "fill-muted-foreground"));

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).ticks(5).tickSize(-width + margin.left + margin.right))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").attr("stroke", "hsl(var(--muted-foreground)/0.05)"))
                .call(g => g.selectAll(".tick text").attr("font-size", "10px").attr("font-weight", "700").attr("class", "fill-muted-foreground"));

            // Line Generators
            const lineAcc = d3.line<any>().x(d => x(d.date)!).y(d => y(d.accuracy));
            const lineDiff = d3.line<any>().x(d => x(d.date)!).y(d => y(d.difficulty));

            svg.append("path").datum(data).attr("fill", "none").attr("stroke", "hsl(var(--primary))").attr("stroke-width", 3).attr("d", lineAcc);
            svg.append("path").datum(data).attr("fill", "none").attr("stroke", "hsl(var(--secondary))").attr("stroke-width", 2).attr("stroke-dasharray", "4,4").attr("d", lineDiff);

            // Points
            svg.selectAll(".dot-acc").data(data).enter().append("circle").attr("cx", d => x(d.date)!).attr("cy", d => y(d.accuracy)).attr("r", 4).attr("fill", "hsl(var(--background))").attr("stroke", "hsl(var(--primary))").attr("stroke-width", 2);
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm lg:col-span-2 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Progress Over Time</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">Track your accuracy and challenge level</p>
                </div>
                <Clock className="w-5 h-5 text-primary" weight="bold" />
            </CardHeader>
            <CardContent className="pt-6">
                <svg ref={d3Container} viewBox="0 0 600 300" className="w-full h-auto" />
                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-4 h-0.5 bg-primary" />
                            <span className="text-[11px] font-medium text-muted-foreground">Accuracy</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-4 h-0.5 border-t-2 border-dashed border-secondary" />
                            <span className="text-[11px] font-medium text-muted-foreground">Difficulty Level</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/exam-history')}
                    >
                        View Full History
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

/* --- WEAKNESS & EFFICIENCY ANALYSIS --- */
export function WeaknessEfficiency() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data = [
        { subject: "DB Systems", effort: 80, result: 40 },
        { subject: "Algorithms", effort: 60, result: 85 },
        { subject: "Networking", effort: 90, result: 30 },
        { subject: "OS Theory", effort: 40, result: 70 },
        { subject: "Architecture", effort: 70, result: 50 },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 400;
            const height = 300;
            const margin = { top: 20, right: 30, bottom: 40, left: 80 };

            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
            const y = d3.scaleBand().domain(data.map(d => d.subject)).range([margin.top, height - margin.bottom]).padding(0.3);

            // Effort Bars
            svg.selectAll(".bar-effort")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", margin.left)
                .attr("y", d => y(d.subject)!)
                .attr("width", d => x(d.effort) - margin.left)
                .attr("height", y.bandwidth())
                .attr("fill", "hsl(var(--muted-foreground)/0.1)")
                .attr("sharp-corners", "");

            // Result Bars (Overlay)
            svg.selectAll(".bar-result")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", margin.left)
                .attr("y", d => y(d.subject)! + y.bandwidth() / 4)
                .attr("width", d => x(d.result) - margin.left)
                .attr("height", y.bandwidth() / 2)
                .attr("fill", d => d.result > d.effort ? "hsl(var(--success))" : "hsl(var(--primary))")
                .attr("opacity", 0.8);

            // Labels
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).tickSize(0))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick text").attr("font-size", "11px").attr("font-weight", "700").attr("class", "fill-muted-foreground"));
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Study Efficiency</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">See which subjects need more attention</p>
                </div>
                <ChartBar className="w-5 h-5 text-primary" weight="bold" />
            </CardHeader>
            <CardContent className="pt-6">
                <svg ref={d3Container} viewBox="0 0 400 300" className="w-full h-auto" />
                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-muted-foreground">Needs Most Focus</span>
                        <span className="text-sm font-bold text-primary">Networking Protocol</span>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/exam')}
                    >
                        Create Practice Exam
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
