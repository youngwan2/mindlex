import { API } from "@/shared/constants/api";
import { globalGetFetcher } from "@/shared/global-fetcher";
import { useQuery } from "@tanstack/react-query";
import { TermsApiType } from "../types/term.types";


export function useTermsGetQuery(searchCondition: TermsApiType) {
    const { page = 1, size = 20, search = '', sort = 'id', order = 'ASC', startDate = '', endDate = '', categoryId } = searchCondition;


    const { data, isLoading, error } = useQuery({
        queryKey: ['terms', { page, size, search, sort, order, startDate, endDate, categoryId }],
        queryFn: () => globalGetFetcher(API.TERMS(searchCondition)),
    })

    return {
        terms: data?.terms || [],
        total: data?.total || 0,
        isLoading,
        error
    };
}

// 카테고리별 용어를 가져오는 커스텀 훅
export function useTermsByCategoryQuery(categoryId: number, enabled: boolean = true) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['terms', 'byCategory', categoryId],
        queryFn: () => globalGetFetcher(API.TERMS({
            page: 1,
            size: 100, // 카테고리별 용어를 충분히 가져오기 위해 크게 설정
            sort: 'id',
            order: 'ASC',
            categoryId: categoryId > 0 ? categoryId : undefined
        })),
        enabled: enabled && categoryId > 0,
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    })

    return {
        terms: data?.terms || [],
        total: data?.total || 0,
        isLoading,
        error
    };
}