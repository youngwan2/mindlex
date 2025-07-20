"use client"

import { useState } from 'react';
import FAQItem from './FAQItem';
import { FAQListProps } from '../types/faq.types';

export default function FAQList({ faqs, searchTerm = '', selectedCategory = 'all' }: FAQListProps) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    // 필터링된 FAQ 목록
    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = searchTerm === '' ||
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const toggleItem = (faqId: number) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(faqId)) {
                newSet.delete(faqId);
            } else {
                newSet.add(faqId);
            }
            return newSet;
        });
    };

    if (filteredFaqs.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchTerm || selectedCategory !== 'all' ?
                        "검색 조건에 맞는 FAQ가 없습니다." :
                        "등록된 FAQ가 없습니다."
                    }
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    다른 카테고리를 선택하거나 검색어를 변경해보세요.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredFaqs.map(faq => (
                <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                />
            ))}
        </div>
    );
}
