import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, ChartPie, CheckCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

/* --- STUDY METHOD EFFECTIVENESS --- */
export function StudyMethodEffectiveness() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data = [
        { method: "Pomodoro", gain: 4.2 },
        { method: "Feynman", gain: 8.5 },
        { method: "SQ3R", gain: 3.1 },
        { method: "Blurting", gain: 6.8 },
        { method: "Reverse", gain: 5.4 },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 400;
            const height = 300;
            const margin = { top: 20, right: 30, bottom: 40, left: 80 };

            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const x = d3.scaleLinear().domain([0, 10]).range([margin.left, width - margin.right]);
            const y = d3.scaleBand().domain(data.map(d => d.method)).range([margin.top, height - margin.bottom]).padding(0.4);

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", margin.left)
                .attr("y", d => y(d.method)!)
                .attr("width", d => x(d.gain) - margin.left)
                .attr("height", y.bandwidth())
                .attr("fill", d => d.gain > 7 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.2)")
                .attr("class", "sharp-corners");

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).tickSize(0))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick text").attr("font-size", "11px").attr("font-weight", "700").attr("class", "fill-muted-foreground"));

            svg.selectAll(".label")
                .data(data)
                .enter()
                .append("text")
                .attr("x", d => x(d.gain) + 5)
                .attr("y", d => y(d.method)! + y.bandwidth() / 2)
                .attr("alignment-baseline", "middle")
                .attr("font-size", "11px")
                .attr("font-weight", "700")
                .attr("class", "fill-primary")
                .text(d => `${d.gain} pts/hr`);
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Study Method Effectiveness</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">Find your best study methods</p>
                </div>
                <List className="w-5 h-5 text-primary" weight="bold" />
            </CardHeader>
            <CardContent className="pt-6">
                <svg ref={d3Container} viewBox="0 0 400 300" className="w-full h-auto" />
                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <p className="text-[11px] font-medium text-muted-foreground max-w-[200px] leading-relaxed">
                        <span className="text-primary font-bold">Feynman Technique</span> yields 2.4x higher retention for you.
                    </p>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/study-room')}
                    >
                        Try This Method
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

/* --- EXAM PERFORMANCE INSIGHTS --- */
export function ExamPerformanceInsights() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const data = [
        { type: "MCQ", value: 45 },
        { type: "Applied", value: 30 },
        { type: "Theory", value: 25 },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 300;
            const height = 300;
            const radius = Math.min(width, height) / 2;

            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const g = svg.append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const pie = d3.pie<any>().value(d => d.value);
            const arc = d3.arc<any>().innerRadius(radius * 0.6).outerRadius(radius * 0.9).padAngle(0.05).cornerRadius(2);

            const color = d3.scaleOrdinal(["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--muted-foreground)/0.2)"]);

            g.selectAll("path")
                .data(pie(data))
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", d => color(d.data.type) as string);

            g.append("text")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("class", "fill-foreground font-black text-2xl tracking-tighter italic")
                .text("78.4%");

            g.append("text")
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("class", "fill-muted-foreground font-bold text-[8px] uppercase tracking-widest")
                .text("Comp Score");
        }
    }, [data]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Exam Performance</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">Breakdown by question type</p>
                </div>
                <ChartPie className="w-5 h-5 text-primary" weight="fill" />
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center">
                <svg ref={d3Container} width={300} height={300} />
                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" weight="fill" />
                            <span className="text-[11px] font-medium text-muted-foreground">Strongest: MCQ</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/exam')}
                    >
                        Take Practice Exam
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
