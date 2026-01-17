import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '../../lib/utils';

interface MCQRendererProps {
    question: {
        id: string;
        question: string;
        options?: string[];
    };
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const MCQRenderer: React.FC<MCQRendererProps> = ({
    question,
    value,
    onChange,
    disabled
}) => {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                    {question.question}
                </h3>
                <RadioGroup
                    value={value}
                    onValueChange={onChange}
                    disabled={disabled}
                    className="grid gap-3"
                >
                    {question.options?.map((option, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer group",
                                value === option
                                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                                    : "border-border/50 bg-card/40 hover:border-primary/50 hover:bg-primary/5"
                            )}
                            onClick={() => !disabled && onChange(option)}
                        >
                            <RadioGroupItem value={option} id={`${question.id}-${index}`} className="sr-only" />
                            <div className={cn(
                                "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                                value === option ? "border-primary bg-primary" : "border-muted-foreground group-hover:border-primary"
                            )}>
                                {value === option && (
                                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                                )}
                            </div>
                            <Label
                                htmlFor={`${question.id}-${index}`}
                                className="flex-1 cursor-pointer font-medium text-foreground py-1"
                            >
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};
