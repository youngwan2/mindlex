import { Button } from "@/components/ui/button";
import CategorySortBar from "./CategorySortBar";
import { Filter } from "lucide-react";
import { CategorySearchParams } from "../types/category.types";

interface CategoryHeaderProps {
    isTop?: boolean; // 최상위 카테고리 여부
    onTopChange?: () => void; // 상위 카테고리 변경 핸들러
    onSearchChange?: (params: CategorySearchParams) => void; // 검색 파라미터 변경 핸들러
    searchParams?: CategorySearchParams; // 현재 검색 파라미터
}

export default function CategoryHeader({ isTop, onTopChange, onSearchChange, searchParams }: CategoryHeaderProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="w-full min-h-[150px] max-w-[1400px] mx-auto px-4 py-6">
                <div className="flex md:items-center items-start justify-between gap-4 md:flex-row flex-col">
                    <div>
                        <h2 className="font-semibold text-3xl mb-2 text-gray-900 dark:text-gray-100">카테고리</h2>
                        <p className="text-gray-500 dark:text-gray-400">정신건강 용어를 체계적으로 분류한 카테고리를 탐색하세요.</p>
                    </div>
                    {onSearchChange && (
                        <CategorySortBar
                            onSearchChange={onSearchChange}
                            initialParams={searchParams}
                        />
                    )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button
                        variant={isTop ? "secondary" : "outline"}
                        onClick={onTopChange}
                        className="rounded-[3px]"
                        size="sm"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        {isTop ? "최상위 카테고리만" : "전체 카테고리 보기"}
                    </Button>
                </div>
            </div>
        </div>
    )
}