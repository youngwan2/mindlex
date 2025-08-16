// filepath: src/components/term/quiz-options/StatsCard.tsx
'use client';
import React from 'react';

type Props = {
    totalCount: number | null;
    loading?: boolean;
};

export default function StatsCard({ totalCount, loading }: Props) {
    return (
        <div className="bg-gradient-to-br from-brand/10 to-brand/5 rounded-xl p-6 border border-brand/20">
            <div className="text-center">
                <div className="text-3xl font-bold text-brand mb-2">
                    {loading ? '...' : totalCount ?? '?'}
                </div>
                <div className="text-sm text-muted-foreground">총 문제 수</div>
            </div>
        </div>
    );
}
