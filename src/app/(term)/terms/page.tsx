"use client"

import { useTermsGetQuery } from "@/features/term/api/queries";
import TermHeader from "@/features/term/components/TermHeader";
import TermMain from "@/features/term/components/TermMain";
import { useSearchParams } from "next/navigation"
import { useState } from "react";

export default function TermPage() {

    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId') || 0;

    const [searchCondition, setSearchCondition] = useState({
        page: 1,
        size: 20,
        search: '',
        sort: 'id',
        order: 'ASC',
        startDate: '',
        endDate: '',
        categoryId: Number(categoryId), // 기본값으로 카테고리 ID를 설정
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
    )
}