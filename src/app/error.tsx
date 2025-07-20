'use client';
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-soft)] dark:from-[var(--color-bg-dark)] dark:to-[var(--color-bg-soft-dark)]">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <ExclamationTriangleIcon className="w-10 h-10 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">문제가 발생했습니다</h2>
            <p className="mb-4 text-base text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                {error.message || '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
            </p>
            <button
                className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold rounded shadow hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onClick={() => reset()}
            >
                다시 시도
            </button>
        </div>
    );
}
