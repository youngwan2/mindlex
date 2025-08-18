"use client"

import { useCategoryGetQuery } from "@/features/category/api/queries";
import CategoryHeader from "@/features/category/components/CategoryHeader";
import CategoryMain from "@/features/category/components/CategoryMain";
import { CategorySearchParams } from "@/features/category/types/category.types";
import { useState, useCallback } from "react";

export default function CategoryPage() {
    const [isTopCategory, setTop] = useState(false);
    const [searchParams, setSearchParams] = useState<CategorySearchParams>({
        sort: 'name',
        order: 'ASC'
    });

    // 검색 파라미터에 isTopOnly 추가
    const queryParams = {
        ...searchParams,
        isTopOnly: isTopCategory
    };

    const { categories, totalCount, isLoading } = useCategoryGetQuery(queryParams);

    const onTopCategoryChange = useCallback(() => {
        setTop(old => !old);
    }, []);

    const onSearchChange = useCallback((params: CategorySearchParams) => {
        setSearchParams(params);
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 overflow-auto">
            <CategoryHeader
                onTopChange={onTopCategoryChange}
                isTop={isTopCategory}
                onSearchChange={onSearchChange}
                searchParams={searchParams}
            />
            <CategoryMain
                categories={categories}
                isLoading={isLoading}
                isTopCategory={isTopCategory}
                totalCount={totalCount}
            />
        </section>
    )
}