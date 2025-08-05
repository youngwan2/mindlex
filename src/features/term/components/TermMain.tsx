import { Term } from "@/features/term/types/term.types";
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/Pagination";
import { useRouter } from "next/navigation";

interface TermMainProps {
    terms: Term[];
    isLoading: boolean;
    totalCount?: number;
    page: number;
    size: number;
    onPageChange: (page: number) => void;
}

type ViewMode = 'grid' | 'list' | 'tree';

export default function TermMain({ terms, isLoading, totalCount, page, size, onPageChange }: TermMainProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const router = useRouter();

    function handleTermClick(termId: number) {
        router.push(`/terms/${termId}`);
    }

    // 뷰 모드 버튼
    const ViewModeButtons = () => (
        <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">보기:</span>
            <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                title="카드 뷰"
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
            </button>
        </div>
    );

    // 카드 뷰
    const renderTermCard = (term: Term) => (
        <li key={term.id} className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-3 w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                    <DocumentTextIcon className="w-6 h-6" />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100">{term.termKo}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{term.termEn}{term.termHanja && ` / ${term.termHanja}`}</span>
                    <span className="text-xs text-blue-500 dark:text-blue-300 font-semibold">{term.category?.name}</span>
                </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">{term.definition || '설명이 없습니다.'}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>등록일: {term.createdAt ? new Date(term.createdAt).toLocaleDateString() : '-'}</span>
            </div>
            <div className="flex items-center gap-2 mt-auto">
                <button onClick={() => handleTermClick(term.id)} className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition text-sm">
                    <span>상세 보기</span>
                </button>
            </div>
        </li>
    );

    // 리스트 뷰
    const renderTermListItem = (term: Term) => (
        <li key={term.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        <DocumentTextIcon className="w-5 h-5" />
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{term.termKo}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">{term.category?.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{term.definition}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{term.createdAt ? new Date(term.createdAt).toLocaleDateString() : '-'}</span>
                    <button onClick={() => handleTermClick(term.id)} className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                        상세
                    </button>
                </div>
            </div>
        </li>
    );

    // 페이지네이션 렌더 함수
    const renderPagination = () => {
        const totalPages = Math.max(1, Math.ceil((totalCount || 0) / size));
        const pageNumbers: number[] = [];
        // 페이지 버튼 로직: 1 ... n ... 마지막
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            if (page <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, -1, totalPages);
            } else if (page >= totalPages - 3) {
                pageNumbers.push(1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, -1, page - 1, page, page + 1, -1, totalPages);
            }
        }
        return (
            <Pagination className="my-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={e => { e.preventDefault(); if (page > 1) onPageChange(page - 1); }}
                            isActive={false}
                        />
                    </PaginationItem>
                    {pageNumbers.map((num, idx) =>
                        num === -1 ? (
                            <PaginationItem key={"ellipsis" + idx}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={num}>
                                <PaginationLink
                                    href="#"
                                    isActive={num === page}
                                    onClick={e => { e.preventDefault(); onPageChange(num); }}
                                >
                                    {num}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={e => { e.preventDefault(); if (page < totalPages) onPageChange(page + 1); }}
                            isActive={false}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    };

    return (
        <div className="mt-6">
            <div className="max-w-[1400px] mx-auto h-auto px-4">
                <p className="flex items-center justify-between mb-4 text-gray-900 dark:text-gray-100">
                    용어 목록 ({totalCount || terms.length})
                </p>
                <ViewModeButtons />
                {terms.length < 1 && !isLoading && <div className="text-center py-10 text-gray-600 dark:text-gray-400">조회된 용어가 없습니다.</div>}
                {isLoading ? (
                    <div className="text-center py-10 text-gray-600 dark:text-gray-400">용어 목록을 불러오는 중..</div>
                ) : (
                    <>
                        {viewMode === 'grid' && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {terms.map((term) => renderTermCard(term))}
                            </ul>
                        )}
                        {viewMode === 'list' && (
                            <ul className="space-y-4">
                                {terms.map((term) => renderTermListItem(term))}
                            </ul>
                        )}
                        {/* 페이지네이션 */}
                        <div className="flex justify-center mt-8">
                            {renderPagination()}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}