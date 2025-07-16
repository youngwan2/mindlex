import { TermsApiType } from "@/features/term/types/term.types";



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const API = {
    TERMS: ({ page = 1, size = 15, sort = 'id', order = 'ASC', search, startDate, endDate }: TermsApiType) => BASE_URL + `/api/terms?page=${page}&size=${size}&sort=${sort}&order=${order}&search=${search}&startDate=${startDate}&endDate=${endDate}`,
    TERM_DETAIL: (id: number | string) => BASE_URL + `/api/(term)/terms/${id}`,
    CATEGORIES: BASE_URL + '/api/categories',
    QUIZ: BASE_URL + '/api/quiz',
}