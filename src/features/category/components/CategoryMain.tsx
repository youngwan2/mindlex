import { Category } from "../types/category.types";
import { HomeModernIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { Squares2X2Icon, ListBulletIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from "next/navigation";

type ViewMode = 'grid' | 'list' | 'tree';

interface CategoryMainProps {
    categories: Category[];
    isLoading: boolean;
    totalCount?: number;
    isTopCategory?: boolean; // 카테고리 상위 여부 

}


export default function CategoryMain({ categories, totalCount, isLoading, isTopCategory }: CategoryMainProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const router = useRouter();

    // 카테고리 이동 함수
    function handleMoveToCategory(categoryId: number) {
        router.push("/terms?categoryId=" + categoryId)



    }    // 뷰 모드 버튼 컴포넌트
    const ViewModeButtons = () => (
        <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">보기:</span>
            <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                title="그리드 뷰"
            >
                <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                title="리스트 뷰"
            >
                <ListBulletIcon className="w-5 h-5" />
            </button>            <button
                onClick={() => setViewMode('tree')}
                className={`p-2 rounded-lg transition ${viewMode === 'tree'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                title="트리 뷰"
            >
                <ChevronDownIcon className="w-5 h-5" />
            </button>
        </div>
    );

    // 그리드 뷰용 카테고리 카드
    const renderCategoryCard = (category: Category, parentCategoryName?: string) => (
        <li key={category.id} className={`p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-3 w-full max-w-md mx-auto`}>
            <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 border border-orange-100 dark:border-orange-800">
                    <HomeModernIcon className="w-6 h-6" />
                </span>                <div className="flex flex-col gap-1">
                    {/* 상위 카테고리명(레벨2 이상일 때만) */}
                    {category.level > 1 ? (
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium mb-0.5"> {'"' + parentCategoryName + '"'}의 하위 카테고리</span>
                    ) : <span className="text-sm text-gray-400 dark:text-gray-500 font-medium mb-0.5"> 상위 카테고리</span>
                    }
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100">{category.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-semibold">Level {category.level}</span>
                    </div>
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{category.description || '카테고리 설명이 없습니다.'}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span className="flex items-center gap-1"><DocumentTextIcon className="w-4 h-4" />{category.termCount ?? 0}개 용어</span>
            </div>
            <div className="flex items-center gap-2 mt-auto">
                <button onClick={() => handleMoveToCategory(category.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition text-sm">
                    <span>용어 보기</span>
                </button>
            </div>
        </li>
    );    // 리스트 뷰용 카테고리 아이템
    const renderCategoryListItem = (category: Category, parentCategoryName?: string) => (
        <li key={category.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 border border-orange-100 dark:border-orange-800">
                        <HomeModernIcon className="w-5 h-5" />
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">Level {category.level}</span>
                            {category.level > 1 && (
                                <span className="text-xs text-gray-400 dark:text-gray-500">← {parentCategoryName}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{category.termCount ?? 0}개 용어</span>
                    <button onClick={() => handleMoveToCategory(category.id)}
                        className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                        보기
                    </button>
                </div>
            </div>
        </li>
    );

    // 트리 뷰용 카테고리 아이템 (드롭다운 형태)
    const renderCategoryTreeItem = (category: Category, depth = 0) => {
        return <CategoryTreeItem category={category} depth={depth} />;
    };    // 트리 아이템 컴포넌트 (useState를 사용하기 위해 분리)
    const CategoryTreeItem = ({ category, depth = 0 }: { category: Category; depth?: number }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
            <div className={`${depth > 0 ? 'ml-6' : ''}`}>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-2">
                    <div className="flex items-center gap-3">
                        {category.children && category.children.length > 0 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                <ChevronDownIcon className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                            </button>
                        )}
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 border border-orange-100 dark:border-orange-800">
                            <HomeModernIcon className="w-4 h-4" />
                        </span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">Level {category.level}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{category.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{category.termCount ?? 0}개</span>
                        <button onClick={() => handleMoveToCategory(category.id)}
                            className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                            보기
                        </button>
                    </div>
                </div>
                {isExpanded && category.children && category.children.length > 0 && (
                    <div className="space-y-1">
                        {category.children.map(child => <CategoryTreeItem key={child.id} category={child} depth={depth + 1} />)}
                    </div>
                )}
            </div>
        );
    };

    // 자식 카테고리 렌더링 함수 (그리드/리스트 뷰용)
    const renderChildren = (children?: Category[], depth = 1, name?: string) => {
        if (!children || children.length === 0) return null;
        return (
            <div className={`ml-${depth * 4} mt-2 space-y-2`}>
                {children.map((child) => (
                    <div key={child.id}>
                        {viewMode === 'grid' && renderCategoryCard(child, name)}
                        {viewMode === 'list' && renderCategoryListItem(child, name)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-6">
            <div className="max-w-[1400px] mx-auto h-auto px-4">
                <p className="flex items-center justify-between mb-4 text-gray-900 dark:text-gray-100">
                    {isTopCategory ? `상위 카테고리(${categories.length})` : `전체 카테고리(${totalCount})`}
                </p>

                {/* 뷰 모드 변경 버튼 */}
                <ViewModeButtons />

                {/* 카드 뷰 */}
                {isLoading ? (
                    <div className="text-center py-10 text-gray-600 dark:text-gray-400">카테고리 목록을 불러오는 중..</div>
                ) : (
                    <>
                        {viewMode === 'grid' && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        {renderCategoryCard(category)}
                                        {!isTopCategory && renderChildren(category.children, category.level, category.name)}
                                    </div>
                                ))}
                            </ul>
                        )}
                        {viewMode === 'list' && (
                            <ul className="space-y-4">
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        {renderCategoryListItem(category)}
                                        {!isTopCategory && renderChildren(category.children, category.level, category.name)}
                                    </div>
                                ))}
                            </ul>
                        )}
                        {viewMode === 'tree' && (
                            <div className="space-y-2">
                                {categories.map((category) => renderCategoryTreeItem(category))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}