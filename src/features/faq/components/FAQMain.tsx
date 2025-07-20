"use client"

import { useState } from 'react';
import FAQCategories from './FAQCategories';
import FAQList from './FAQList';
import { FAQ, FAQCategory } from '../types/faq.types';

interface FAQMainProps {
    faqs: FAQ[];
    categories: FAQCategory[];
    searchTerm: string;
}

export default function FAQMain({ faqs, categories, searchTerm }: FAQMainProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 인기 FAQ 필터링 (상위 5개)
    const popularFaqs = faqs.filter(faq => faq.isPopular).slice(0, 5);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-[1000px] mx-auto px-4 py-12">
                {/* 인기 FAQ 섹션 (검색어가 없을 때만 표시) */}
                {!searchTerm && popularFaqs.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
                            🔥 인기 FAQ
                        </h2>
                        <FAQList
                            faqs={popularFaqs}
                            searchTerm=""
                            selectedCategory="all"
                        />
                    </div>
                )}

                {/* 카테고리 필터 */}
                <FAQCategories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                {/* FAQ 목록 */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {searchTerm ? `"${searchTerm}" 검색 결과` :
                                selectedCategory === 'all' ? '전체 FAQ' :
                                    categories.find(c => c.name === selectedCategory)?.label + ' FAQ'}
                        </h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {faqs.filter(faq => {
                                const matchesSearch = searchTerm === '' ||
                                    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                                const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
                                return matchesSearch && matchesCategory;
                            }).length}개의 FAQ
                        </div>
                    </div>

                    <FAQList
                        faqs={faqs}
                        searchTerm={searchTerm}
                        selectedCategory={selectedCategory}
                    />
                </div>

                {/* 추가 도움말 섹션 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        원하는 답변을 찾지 못하셨나요?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        더 자세한 문의사항이 있으시면 언제든지 연락해주세요.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href="mailto:support@mindlex.com"
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg transition-colors"
                        >
                            📧 이메일 문의
                        </a>
                        <a
                            href="/contact"
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                        >
                            📝 문의하기
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
