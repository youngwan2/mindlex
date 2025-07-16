import { API } from "@/shared/constants/api";
import { globalGetFetcher } from "@/shared/global-fetcher";
import { useQuery } from "@tanstack/react-query";
import { TermsApiType } from "../types/term.types";





export function useTermsGetQuery(searchCondition: TermsApiType) {
    const { page = 1, size = 20, search = '', sort = 'id', order = 'ASC', startDate = '', endDate = '' } = searchCondition;


    const { data, isLoading, error } = useQuery({
        queryKey: ['terms', { page, size, search, sort, order, startDate, endDate }],
        queryFn: () => globalGetFetcher(API.TERMS(searchCondition)),
    })

    return {
        terms: data?.terms || [],
        total: data?.total || 0,
        isLoading,
        error
    };
}