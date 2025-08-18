"use client";

import { useTermsGetQuery } from "@/features/term/api/queries";
import TermHeader from "@/features/term/components/TermHeader";
import TermMain from "@/features/term/components/TermMain";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TermPageClient() {
    const searchParams = useSearchParams();
    const categoryIdParam = searchParams.get('categoryId');

    // categoryId가 없거나 0이면 undefined로 설정하여 모든 용어 조회
    const initialCategoryId = categoryIdParam && Number(categoryIdParam) > 0 ? Number(categoryIdParam) : undefined;

    const [searchCondition, setSearchCondition] = useState({
        page: 1,
        size: 20,
        search: '',
        sort: 'id',
        order: 'ASC',
        startDate: '',
        endDate: '',
        categoryId: initialCategoryId,
    });

    function onSubmit(formData: FormData) {
        const search = formData.get('search')?.toString() || '';
        setSearchCondition(prev => ({ ...prev, search, page: 1 }))
    }
    function handlePageChange(page: number) {
        setSearchCondition(prev => ({ ...prev, page }));
    }
    const { isLoading, terms, total } = useTermsGetQuery(searchCondition);
    return (
        <section>
            <TermHeader onSubmit={onSubmit} isLoading={isLoading} />
            <TermMain
                isLoading={isLoading}
                terms={terms}
                totalCount={total}
                page={searchCondition.page}
                size={searchCondition.size}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
