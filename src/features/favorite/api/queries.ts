import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "./fetcher";




/**
 * 
 * @param type - 북마크 타입 ('term' 또는 'quiz')
 * @param page - 현재 페이지 번호
 * @param size - 페이지당 항목 수
 * @param search - 검색어 (선택 사항)
 * 
 * @description 북마크 목록을 조회하는 쿼리 훅입니다. 
 * type에 따라 'term' 또는 'quiz' 북마크를 조회하며, 페이지네이션과 검색 기능을 지원합니다.
 * @returns 
 */
export function useFavoritesGetQuery(type: 'term' | 'quiz' | 'all', page: number, size: number, search?: string) {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['favorites', type, page, size, search],
        queryFn: () => fetchFavorites(type, page, size, search),
    });

    // 데이터가 없을 경우 기본값 설정
    const totalCount = data?.totalCount || 0;
    const favorites = data?.favorites || [];
    const totalCountTerm = data?.totalCountTerm ?? 0;
    const totalCountQuiz = data?.totalCountQuiz ?? 0;

    return {
        favorites,
        totalCount,
        totalCountTerm,
        totalCountQuiz,
        isLoading,
        isError,
        error
    };
}