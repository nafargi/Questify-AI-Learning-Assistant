import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { Link2 } from 'lucide-react';

interface MatchingRendererProps {
    question: {
        id: string;
        question: string;
        matchingPairs?: { id: string; left: string; right: string }[];
    };
    value: string[]; // Array of right-side IDs in the order of left-side list
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export const MatchingRenderer: React.FC<MatchingRendererProps> = ({
    question,
    value,
    onChange,
    disabled
}) => {
    const pairs = question.matchingPairs || [];
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);

    // Initialize or maintain mapping
    // value[i] is the id of the 'right' text that is matched with pairs[i].left
    const currentMapping = value && value.length === pairs.length ? value : Array(pairs.length).fill(null);

    const handleRightClick = (rightId: string) => {
        if (disabled || selectedLeft === null) return;

        const newMapping = [...currentMapping];
        // If this rightId was already used, clear its previous position
        const existingIndex = newMapping.indexOf(rightId);
        if (existingIndex !== -1) newMapping[existingIndex] = null;

        newMapping[selectedLeft] = rightId;
        onChange(newMapping);
        setSelectedLeft(null); // Reset selection
    };

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-6">
                <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                    {question.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">Criteria</div>
                        {pairs.map((pair, index) => (
                            <button
                                key={pair.id}
                                disabled={disabled}
                                onClick={() => setSelectedLeft(index)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                                    selectedLeft === index
                                        ? "border-primary bg-primary/10"
                                        : currentMapping[index]
                                            ? "border-primary/30 bg-primary/5"
                                            : "border-border/50 bg-card/40 hover:border-primary/30"
                                )}
                            >
                                <span className="font-medium">{pair.left}</span>
                                {currentMapping[index] && <Link2 className="w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>

                    {/* Right Column (Shuffled maybe? For now just listed) */}
                    <div className="space-y-3">
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">Matches</div>
                        {/* We show the unique right options */}
                        {pairs.map((pair) => (
                            <button
                                key={`${pair.id}-rhs`}
                                disabled={disabled || selectedLeft === null}
                                onClick={() => handleRightClick(pair.right)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all group",
                                    currentMapping.includes(pair.right)
                                        ? "border-success bg-success/5 opacity-60"
                                        : "border-border/50 bg-card/40 hover:border-primary/30"
                                )}
                            >
                                <span className="font-medium">{pair.right}</span>
                                {currentMapping.includes(pair.right) && (
                                    <span className="ml-2 text-xs text-success font-bold uppercase">(Matched)</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {selectedLeft !== null && (
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-pulse">
                                Select a match for "{pairs[selectedLeft].left}"
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
