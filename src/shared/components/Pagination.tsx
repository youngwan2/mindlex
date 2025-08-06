'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    maxVisiblePages = 5,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 표시할 페이지 범위 계산
    const getPageRange = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const pageRange = getPageRange();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                aria-label="이전 페이지"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pageRange[0] > 1 && (
                <>
                    <Button
                        variant={currentPage === 1 ? "default" : "outline"}
                        size="icon"
                        onClick={() => onPageChange(1)}
                        aria-label="첫 페이지"
                    >
                        1
                    </Button>
                    {pageRange[0] > 2 && (
                        <Button variant="outline" size="icon" disabled>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    )}
                </>
            )}

            {pageRange.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => onPageChange(page)}
                    aria-label={`${page} 페이지`}
                    className={currentPage === page ? "bg-brand hover:bg-brand-hover text-white" : ""}
                >
                    {page}
                </Button>
            ))}

            {pageRange[pageRange.length - 1] < totalPages && (
                <>
                    {pageRange[pageRange.length - 1] < totalPages - 1 && (
                        <Button variant="outline" size="icon" disabled>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="icon"
                        onClick={() => onPageChange(totalPages)}
                        aria-label="마지막 페이지"
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
