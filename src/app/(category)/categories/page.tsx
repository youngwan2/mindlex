"use client"

import { useCategoryGetQuery } from "@/features/category/api/queries";
import CategoryHeader from "@/features/category/components/CategoryHeader";
import CategoryMain from "@/features/category/components/CategoryMain";
import { useState } from "react";

export default function CategoryPage() {

    const [isTopCategory, setTop] = useState(false)
    const { categories, totalCount, isLoading } = useCategoryGetQuery();

    function onTopCategoryChange() {
        setTop(old => !old);
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 overflow-auto">
            <CategoryHeader onTopChange={onTopCategoryChange} isTop={isTopCategory} />
            <CategoryMain categories={categories} isLoading={isLoading} isTopCategory={isTopCategory} totalCount={totalCount} />
        </section>
    )
}