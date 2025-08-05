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
}