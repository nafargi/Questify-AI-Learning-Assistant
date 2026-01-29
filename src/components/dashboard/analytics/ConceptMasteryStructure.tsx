import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    strength: number; // 0 to 1
    size: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string;
    target: string;
    value: number;
}

export function ConceptMasteryStructure() {
    const d3Container = useRef<SVGSVGElement | null>(null);
    const navigate = useNavigate();

    const nodes: Node[] = [
        { id: "Databases", group: 1, strength: 0.8, size: 20 },
        { id: "SQL Basics", group: 1, strength: 0.95, size: 15 },
        { id: "Normalization", group: 1, strength: 0.45, size: 18 },
        { id: "Indexing", group: 1, strength: 0.6, size: 12 },
        { id: "Transactions", group: 1, strength: 0.3, size: 10 },
        { id: "Algorithms", group: 2, strength: 0.7, size: 22 },
        { id: "Big O", group: 2, strength: 0.85, size: 14 },
        { id: "Sorting", group: 2, strength: 0.75, size: 16 },
        { id: "Hashing", group: 2, strength: 0.2, size: 12 },
    ];

    const links: Link[] = [
        { source: "Databases", target: "SQL Basics", value: 1 },
        { source: "Databases", target: "Normalization", value: 1 },
        { source: "Databases", target: "Indexing", value: 1 },
        { source: "Databases", target: "Transactions", value: 1 },
        { source: "Algorithms", target: "Big O", value: 1 },
        { source: "Algorithms", target: "Sorting", value: 1 },
        { source: "Algorithms", target: "Hashing", value: 1 },
        { source: "Normalization", target: "SQL Basics", value: 0.5 },
    ];

    useEffect(() => {
        if (d3Container.current) {
            const width = 600;
            const height = 400;
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            const simulation = d3.forceSimulation<Node>(nodes)
                .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(80))
                .force("charge", d3.forceManyBody().strength(-200))
                .force("center", d3.forceCenter(width / 2, height / 2));

            const link = svg.append("g")
                .attr("stroke", "hsl(var(--muted-foreground)/0.1)")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value));

            const node = svg.append("g")
                .attr("stroke", "none")
                .selectAll("g")
                .data(nodes)
                .join("g")
                .call(d3.drag<any, any>()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append("circle")
                .attr("r", d => d.size / 1.5)
                .attr("fill", d => {
                    const color = d3.interpolateRdYlGn(d.strength);
                    return color;
                })
                .attr("stroke", "hsl(var(--background))")
                .attr("stroke-width", 2);

            node.append("text")
                .text(d => d.id)
                .attr("x", 12)
                .attr("y", 4)
                .attr("font-size", "11px")
                .attr("font-weight", "700")
                .attr("class", "fill-muted-foreground");

            simulation.on("tick", () => {
                link
                    .attr("x1", d => (d.source as any).x)
                    .attr("y1", d => (d.source as any).y)
                    .attr("x2", d => (d.target as any).x)
                    .attr("y2", d => (d.target as any).y);

                node
                    .attr("transform", d => `translate(${d.x},${d.y})`);
            });

            function dragstarted(event: any) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event: any) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event: any) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
        }
    }, [nodes, links]);

    return (
        <Card className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm lg:col-span-2 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/5">
                <div>
                    <CardTitle className="text-base font-bold tracking-tight">Topic Connections</CardTitle>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">See how topics relate • Drag to explore • Color shows mastery</p>
                </div>
                <Brain className="w-5 h-5 text-primary" weight="fill" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
                <svg ref={d3Container} viewBox="0 0 600 400" className="w-full h-auto cursor-crosshair" />

                <div className="w-full pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-green-500" />
                            <span className="text-[11px] font-medium text-muted-foreground">Strong Mastery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-red-500" />
                            <span className="text-[11px] font-medium text-muted-foreground">Needs Practice</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 rounded-lg border-primary/20 text-[11px] font-semibold tracking-normal hover:bg-primary/5 text-primary"
                        onClick={() => navigate('/study-room')}
                    >
                        Study Selected Topic
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
