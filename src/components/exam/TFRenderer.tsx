import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { Check, X } from 'lucide-react';

interface TFRendererProps {
    question: {
        id: string;
        question: string;
    };
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const TFRenderer: React.FC<TFRendererProps> = ({
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
                <div className="grid grid-cols-2 gap-4">
                    <button
                        disabled={disabled}
                        onClick={() => onChange('true')}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-3 group",
                            value === 'true'
                                ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                                : "border-border/50 bg-card/40 hover:border-green-500/50 hover:bg-green-500/5"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            value === 'true' ? "bg-green-500 text-white" : "bg-muted text-muted-foreground group-hover:bg-green-500/20 group-hover:text-green-500"
                        )}>
                            <Check className="w-6 h-6" />
                        </div>
                        <span className={cn(
                            "font-bold text-lg",
                            value === 'true' ? "text-green-500" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                            TRUE
                        </span>
                    </button>

                    <button
                        disabled={disabled}
                        onClick={() => onChange('false')}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-3 group",
                            value === 'false'
                                ? "border-destructive bg-destructive/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                                : "border-border/50 bg-card/40 hover:border-destructive/50 hover:bg-destructive/5"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            value === 'false' ? "bg-destructive text-white" : "bg-muted text-muted-foreground group-hover:bg-destructive/20 group-hover:text-destructive"
                        )}>
                            <X className="w-6 h-6" />
                        </div>
                        <span className={cn(
                            "font-bold text-lg",
                            value === 'false' ? "text-destructive" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                            FALSE
                        </span>
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};
