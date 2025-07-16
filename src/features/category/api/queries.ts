import { API } from "@/shared/constants/api";
import { KEY } from "@/shared/constants/query-key";
import { globalGetFetcher } from "@/shared/global-fetcher";
import { useQuery } from "@tanstack/react-query";



export function useCategoryGetQuery() {

    const { data, error, isLoading } = useQuery({
        queryKey: KEY.CATEGORIES,
        queryFn: () => globalGetFetcher(API.CATEGORIES),
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
        refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    })


    return {
        categories: data || [],
        isLoading,
        error: error as Error | null
    }
}