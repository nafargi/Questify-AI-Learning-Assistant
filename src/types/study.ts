import { Icon } from "@phosphor-icons/react";

export type StudyMethodId =
    | 'standard'
    | 'pomodoro'
    | 'feynman'
    | 'sq3r'
    | 'blurting'
    | 'leitner'
    | 'teaching'
    | 'spaced_repetition'
    | 'active_recall'
    | 'interleaved'
    | 'reverse_learning';

export interface StudyMethodConfig {
    id: StudyMethodId;
    label: string;
    description: string;
    icon: Icon;
    color: string;
    gradient: string;
    badge?: string;
    recommendedFor?: string[];
}
