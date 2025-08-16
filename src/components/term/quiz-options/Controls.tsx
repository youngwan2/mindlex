// filepath: src/components/term/quiz-options/Controls.tsx
'use client';
import React from 'react';

type Props = {
    typesLength: number;
    onCancel: () => void;
    onQuickStart: () => void;
    onCustomStart: () => void;
};

export default function Controls({ typesLength, onCancel, onQuickStart, onCustomStart }: Props) {
    return (
        <div className="sticky bottom-0 bg-white border-t border-border/30 px-8 py-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                    onClick={onCancel}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                    취소
                </button>
                <button
                    onClick={onQuickStart}
                    disabled={typesLength === 0}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    빠른 시작
                </button>
                <button
                    onClick={onCustomStart}
                    disabled={typesLength === 0}
                    className="px-8 py-3 bg-gradient-to-r from-brand to-brand-hover text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    퀴즈 시작하기
                </button>
            </div>

            {typesLength === 0 && (
                <p className="text-sm text-red-500 text-center mt-2">
                    최소 1개 이상의 문제 유형을 선택해주세요.
                </p>
            )}
        </div>
    );
}
