import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { Code, Terminal } from 'lucide-react';

interface CodeRendererProps {
    question: {
        id: string;
        question: string;
        starterCode?: string;
        language?: string;
    };
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({
    question,
    value,
    onChange,
    disabled
}) => {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                        {question.question}
                    </h3>
                </div>

                <div className="relative group rounded-2xl overflow-hidden border border-border/50 bg-[#0d1117] shadow-2xl">
                    <div className="bg-[#161b22] px-4 py-2 border-b border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <span className="ml-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                {question.language || 'code'}.editor
                            </span>
                        </div>
                        <Code className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <textarea
                        disabled={disabled}
                        value={value || question.starterCode || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={cn(
                            "w-full h-80 p-6 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none focus:ring-0 custom-scrollbar",
                            disabled && "opacity-80"
                        )}
                        placeholder="// Write your code here..."
                        spellCheck={false}
                    />

                    <div className="absolute bottom-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono text-primary-foreground/70 uppercase">
                        {value ? `${value.length} chars` : '0 chars'}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 px-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Auto-saving enabled... Output will be evaluated upon submission.
                </div>
            </CardContent>
        </Card>
    );
};
