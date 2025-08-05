import { TermsApiType } from "@/features/term/types/term.types";



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const API = {
    // 용어 요약
    TERMS: ({ page = 1, size = 15, sort = 'id', order = 'ASC', search, startDate, endDate, categoryId }: TermsApiType) => BASE_URL + `/api/terms?page=${page}&size=${size}&sort=${sort}&order=${order}&search=${search}&startDate=${startDate}&endDate=${endDate}&categoryId=${categoryId || ''}`,

    // 용어 상세
    TERM_DETAIL: (id: number | string) => BASE_URL + `/api/terms/${id}`,

    // 카테고리 목록(전체)
    CATEGORIES: BASE_URL + '/api/categories',
    QUIZ: BASE_URL + '/api/quiz',

    FAVORITES: {
        // 즐겨찾기 생성
        CREATE: BASE_URL + '/api/favorites',
        // 즐겨찾기 삭제
        DELETE: (id: number, type: 'term' | 'quiz') => BASE_URL + `/api/favorites/${id}?type=${type}`,
        // 즐겨찾기 목록 조회
        LIST: (type: 'term' | 'quiz', page: number, size: number) => BASE_URL + `/api/favorites?type=${type}&page=${page}&size=${size}`,
        // 즐겨찾기 대상 조회
        TARGET: (targetId: number, type: string) => BASE_URL + `/api/favorites/target?targetId=${targetId}&type=${type}`,
    }
}