'use client';
import React, { useState } from 'react';
import { useCategoryGetQuery } from '@/features/category/api/queries';
import { useTermsByCategoryQuery, useTermsGetQuery } from '@/features/term/api/queries';
import QuizOptionsModal from '@/components/term/QuizOptionsModal';
import { Category } from '@/features/category/types/category.types';
import { Term } from '@/features/term/types/term.types';
import { HiPlay, HiLightBulb, HiBookOpen, HiCollection, HiSearch, HiChevronRight } from 'react-icons/hi';
import { MdQuiz } from 'react-icons/md';
import { motion } from 'framer-motion';

type QuizMode = 'category' | 'term' | 'random';

export default function QuizPage() {
    const [selectedMode, setSelectedMode] = useState<QuizMode>('category');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [termSearchQuery, setTermSearchQuery] = useState('');

    const { categories, isLoading: categoriesLoading } = useCategoryGetQuery();

    // 카테고리별 용어 목록 조회
    const { terms: categoryTerms, isLoading: categoryTermsLoading } = useTermsByCategoryQuery(
        selectedCategory?.id || 0,
        selectedMode === 'category' && !!selectedCategory
    );

    // 용어 검색을 위한 전체 용어 조회
    const { terms: searchTerms, isLoading: searchTermsLoading } = useTermsGetQuery({
        page: 1,
        size: 50,
        sort: 'id',
        order: 'ASC',
        search: termSearchQuery
    });

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setSelectedTerm(null); // 카테고리 변경 시 선택된 용어 초기화
    };

    const handleTermSelect = (term: Term) => {
        setSelectedTerm(term);
    };

    const handleStartQuiz = () => {
        if (selectedMode === 'category' && selectedCategory) {
            // 카테고리 기반 퀴즈: 첫 번째 용어 ID 사용
            if (categoryTerms.length > 0) {
                setSelectedTerm(categoryTerms[0]);
                setShowQuizModal(true);
            }
        } else if (selectedMode === 'term' && selectedTerm) {
            setShowQuizModal(true);
        } else if (selectedMode === 'random') {
            // 랜덤 퀴즈: 모든 카테고리에서 첫 번째 카테고리의 첫 번째 용어 사용
            if (categories.length > 0) {
                const firstCategory = categories[0];
                setSelectedCategory(firstCategory);
                setShowQuizModal(true);
            }
        }
    };
    const filteredCategories = categories.filter((category: Category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTerms = searchTerms.filter((term: Term) =>
        term.termKo.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
        term.termEn.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
        term.description.toLowerCase().includes(termSearchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-brand to-brand-hover text-white mb-6">
                        <MdQuiz className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        퀴즈에 도전해보세요
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        카테고리별, 용어별로 퀴즈를 선택하여 정신건강 용어 학습을 재미있게 진행해보세요
                    </p>
                </motion.div>

                {/* 퀴즈 모드 선택 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">퀴즈 방식 선택</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                mode: 'category' as QuizMode,
                                icon: <HiCollection className="w-8 h-8" />,
                                title: '카테고리별 퀴즈',
                                description: '특정 분야의 용어들로 퀴즈를 구성합니다',
                                color: 'from-blue-500 to-blue-600'
                            },
                            {
                                mode: 'term' as QuizMode,
                                icon: <HiBookOpen className="w-8 h-8" />,
                                title: '용어별 퀴즈',
                                description: '특정 용어에 대한 심화 퀴즈를 진행합니다',
                                color: 'from-green-500 to-green-600'
                            },
                            {
                                mode: 'random' as QuizMode,
                                icon: <HiLightBulb className="w-8 h-8" />,
                                title: '랜덤 퀴즈',
                                description: '다양한 분야의 용어가 무작위로 출제됩니다',
                                color: 'from-purple-500 to-purple-600'
                            }
                        ].map((option) => (
                            <motion.button
                                key={option.mode}
                                onClick={() => setSelectedMode(option.mode)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${selectedMode === option.mode
                                    ? 'border-brand bg-brand/5 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand/30'
                                    }`}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} text-white mb-4`}>
                                    {option.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {option.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {option.description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* 카테고리 선택 (카테고리 모드일 때만 표시) */}
                {selectedMode === 'category' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">카테고리 선택</h2>
                            <div className="relative">
                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="카테고리 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand focus:border-transparent"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        aria-label="검색어 지우기"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        {categoriesLoading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">카테고리를 불러오는 중...</p>
                            </div>
                        ) : filteredCategories.length === 0 ? (
                            <div className="text-center py-12 col-span-full">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                    <HiCollection className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {searchTerm ? '검색 결과가 없습니다' : '카테고리가 없습니다'}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {searchTerm ? '다른 검색어를 시도해보세요' : '카테고리가 추가되면 여기에 표시됩니다'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredCategories.map((category: Category) => (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-4 rounded-lg border transition-all duration-200 text-left ${selectedCategory?.id === category.id
                                            ? 'border-brand bg-brand/5 shadow-md'
                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand/30'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {category.name}
                                            </h3>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                                {category.termCount || 0}개 용어
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                            {category.description}
                                        </p>
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* 선택된 카테고리의 용어 목록 */}
                        {selectedCategory && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    {selectedCategory.name} 카테고리의 용어들
                                </h3>
                                {categoryTermsLoading ? (
                                    <div className="text-center py-4">
                                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-brand"></div>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">용어를 불러오는 중...</p>
                                    </div>
                                ) : categoryTerms.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="text-gray-500 dark:text-gray-400">이 카테고리에는 아직 용어가 없습니다.</p>
                                    </div>
                                ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {categoryTerms.slice(0, 9).map((term: Term) => (
                                        <div key={term.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                                            <div className="font-medium text-gray-900 dark:text-gray-100">{term.termKo}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{term.termEn}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                                                {term.definition}
                                            </div>
                                        </div>
                                    ))}
                                    {categoryTerms.length > 9 && (
                                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                +{categoryTerms.length - 9}개 더
                                            </span>
                                        </div>
                                    )}
                                </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 용어 검색 및 선택 (용어 모드일 때만 표시) */}
                {selectedMode === 'term' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">용어 검색 및 선택</h2>

                        <div className="relative mb-6">
                            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="용어명으로 검색..."
                                value={termSearchQuery}
                                onChange={(e) => setTermSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand focus:border-transparent"
                            />
                            {termSearchQuery && (
                                <button
                                    onClick={() => setTermSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label="검색어 지우기"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {searchTermsLoading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">용어를 검색하는 중...</p>
                            </div>
                        ) : filteredTerms.length === 0 && termSearchQuery ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                    <HiBookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    검색 결과가 없습니다
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    다른 검색어를 시도해보세요
                                </p>
                            </div>
                        ) : termSearchQuery ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTerms.map((term: Term) => (
                                <motion.button
                                    key={term.id}
                                    onClick={() => handleTermSelect(term)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-lg border transition-all duration-200 text-left ${selectedTerm?.id === term.id
                                        ? 'border-brand bg-brand/5 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand/30'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {term.termKo}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {term.termEn}
                                            </p>
                                        </div>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                                            {term.category.name}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {term.definition}
                                    </p>
                                </motion.button>
                            ))}
                        </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <HiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400">
                                    용어명을 검색하여 퀴즈할 용어를 선택해주세요
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 퀴즈 시작 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <button
                        onClick={handleStartQuiz}
                        disabled={
                            (selectedMode === 'category' && (!selectedCategory || categoryTerms.length === 0)) ||
                            (selectedMode === 'term' && !selectedTerm) ||
                            categoriesLoading
                        }
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-brand-hover text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <HiPlay className="w-6 h-6" />
                        퀴즈 시작하기
                        <HiChevronRight className="w-5 h-5" />
                    </button>

                    {selectedMode === 'category' && selectedCategory && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                            선택된 카테고리: <span className="font-medium text-brand">{selectedCategory.name}</span>
                            {categoryTerms.length > 0 && (
                                <span className="text-gray-400 ml-2">({categoryTerms.length}개 용어)</span>
                            )}
                        </p>
                    )}
                    {selectedMode === 'term' && selectedTerm && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                            선택된 용어: <span className="font-medium text-brand">{selectedTerm.termKo}</span>
                            <span className="text-gray-400 ml-2">({selectedTerm.termEn})</span>
                        </p>
                    )}
                </motion.div>

                {/* 퀴즈 옵션 모달 */}
                {showQuizModal && selectedTerm && (
                    <QuizOptionsModal
                        termId={selectedTerm.id.toString()}
                        onClose={() => setShowQuizModal(false)}
                    />
                )}
            </div>
        </div>
    );
}