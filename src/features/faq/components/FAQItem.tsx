"use client"

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';
import { FAQItemProps } from '../types/faq.types';

export default function FAQItem({ faq, isOpen: controlledOpen, onToggle }: FAQItemProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    // 제어되는 상태가 있으면 사용, 없으면 내부 상태 사용
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const handleToggle = onToggle || (() => setInternalOpen(!internalOpen));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <button
                onClick={handleToggle}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
                <div className="flex items-start gap-3 flex-1">
                    {faq.isPopular && (
                        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800 flex-shrink-0 mt-0.5">
                            인기
                        </Badge>
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-left">
                        {faq.question}
                    </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                    {isOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="pt-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                        </p>
                        {faq.tags && faq.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {faq.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
