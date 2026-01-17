import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';

interface FillBlankRendererProps {
    question: {
        id: string;
        question: string;
        segments?: { text: string; isBlank: boolean; blankId?: string }[];
    };
    value: string[]; // Array of strings for each blank
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export const FillBlankRenderer: React.FC<FillBlankRendererProps> = ({
    question,
    value,
    onChange,
    disabled
}) => {
    const segments = question.segments || [];
    const blankCount = segments.filter(s => s.isBlank).length;
    const currentAnswers = value && value.length === blankCount ? value : Array(blankCount).fill('');

    const handleInputChange = (index: number, text: string) => {
        const newAnswers = [...currentAnswers];
        newAnswers[index] = text;
        onChange(newAnswers);
    };

    let blankIndex = 0;

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                    {question.question}
                </h3>

                <div className="p-6 rounded-2xl bg-card/40 border border-border/50 leading-loose text-lg">
                    {segments.map((segment, i) => {
                        if (segment.isBlank) {
                            const currentIdx = blankIndex++;
                            return (
                                <Input
                                    key={i}
                                    disabled={disabled}
                                    value={currentAnswers[currentIdx] || ''}
                                    onChange={(e) => handleInputChange(currentIdx, e.target.value)}
                                    className={cn(
                                        "inline-block w-40 h-9 mx-2 border-b-2 border-t-0 border-x-0 rounded-none bg-transparent focus-visible:ring-0 px-2 transition-all font-bold text-primary",
                                        currentAnswers[currentIdx] ? "border-primary" : "border-muted"
                                    )}
                                    placeholder="..."
                                />
                            );
                        }
                        return <span key={i}>{segment.text}</span>;
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
