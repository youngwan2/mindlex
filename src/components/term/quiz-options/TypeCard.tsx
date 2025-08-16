// filepath: src/components/term/quiz-options/TypeCard.tsx
'use client';
import React from 'react';
import { QuizType, TYPE_INFO } from './constants';
import { HiViewList, HiCheckCircle, HiPencilAlt } from 'react-icons/hi';

type Props = {
    type: QuizType;
    active: boolean;
    count: number;
    onToggle: (t: QuizType) => void;
};

function iconFor(key: string) {
    switch (key) {
        case 'list':
            return <HiViewList className="w-6 h-6" />;
        case 'checkCircle':
            return <HiCheckCircle className="w-6 h-6" />;
        case 'edit':
            return <HiPencilAlt className="w-6 h-6" />;
        default:
            return <HiPencilAlt className="w-6 h-6" />;
    }
}

export default function TypeCard({ type, active, count, onToggle }: Props) {
    const info = TYPE_INFO?.[type] ?? { label: String(type), iconKey: 'edit', description: '', difficulty: '', color: '' };
    return (
        <button
            onClick={() => onToggle(type)}
            disabled={count === 0}
            className={`relative p-6 rounded-xl border transition-all duration-200 ${active
                ? 'bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] border-[var(--color-brand)] text-white shadow-lg transform scale-105'
                : count === 0
                    ? 'bg-muted text-muted-foreground cursor-not-allowed border-border'
                    : 'bg-card hover:bg-[var(--color-brand)]/5 hover:border-[var(--color-brand)]/20 border-border'
                }`}
        >
            {count === 0 && (
                <div className="absolute inset-0 bg-muted/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-sm text-muted-foreground font-medium">문제 없음</span>
                </div>
            )}

            <div className="text-center space-y-3">
                <div className={`p-3 rounded-lg w-fit mx-auto ${active ? 'bg-white/20' : 'bg-[var(--color-brand)]/10'}`}>
                    <div className={`text-2xl ${active ? 'text-white' : 'text-[var(--color-brand)]'}`}>
                        {iconFor(info.iconKey)}
                    </div>
                </div>
                <div>
                    <h4 className={`font-semibold text-lg ${active ? 'text-white' : 'text-foreground'}`}>
                        {info.label}
                    </h4>
                    <p className={`text-sm mt-1 ${active ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {info.description}
                    </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${active ? 'bg-white/20 text-white' : 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]'}`}>
                        {info.difficulty}
                    </span>
                    <span className={`font-bold text-lg ${active ? 'text-white' : 'text-[var(--color-brand)]'}`}>
                        {count}
                    </span>
                </div>
            </div>
        </button>
    );
}
