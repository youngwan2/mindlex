import { API } from "@/shared/constants/api";
import { KEY } from "@/shared/constants/query-key";
import { globalGetFetcher } from "@/shared/global-fetcher";
import { useQuery } from "@tanstack/react-query";
import { CategorySearchParams } from "../types/category.types";



export function useCategoryGetQuery(params?: CategorySearchParams) {

    const { data, error, isLoading } = useQuery({
        queryKey: [...KEY.CATEGORIES, params],
        queryFn: () => globalGetFetcher(API.CATEGORIES(params)),
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
        refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    })


    return {
        categories: data?.categories || [],
        totalCount: data?.totalCount || 0, // 전체 카테고리 수
        isLoading,
        error: error as Error | null
    }
}