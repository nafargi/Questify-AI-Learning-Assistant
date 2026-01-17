import React from 'react';
import { Question } from '@/data/mockData';
import { MCQRenderer } from './MCQRenderer';
import { TFRenderer } from './TFRenderer';
import { MatchingRenderer } from './MatchingRenderer';
import { FillBlankRenderer } from './FillBlankRenderer';
import { CodeRenderer } from './CodeRenderer';

interface QuestionRendererProps {
    question: Question;
    value?: any;
    onChange: (answer: any) => void;
    disabled?: boolean;
}

export function QuestionRenderer({ question, value, onChange, disabled }: QuestionRendererProps) {
    switch (question.type) {
        case 'mcq':
            return (
                <MCQRenderer
                    question={question}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        case 'true-false':
            return (
                <TFRenderer
                    question={question}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        case 'matching':
            return (
                <MatchingRenderer
                    question={question}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        case 'fill-blank':
            return (
                <FillBlankRenderer
                    question={question}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        case 'coding':
            return (
                <CodeRenderer
                    question={question}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            );

        default:
            return (
                <div className="p-4 rounded-xl border border-dashed border-muted text-muted-foreground text-center">
                    Unsupported question type: {question.type}
                </div>
            );
    }
}
