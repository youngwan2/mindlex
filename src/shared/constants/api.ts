import { TermsApiType } from "@/features/term/types/term.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const API = {
    // 용어 요약
    TERMS: ({ page = 1, size = 15, sort = 'id', order = 'ASC', search, startDate, endDate, categoryId }: TermsApiType) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('size', String(size));
        params.set('sort', sort);
        params.set('order', order); if (search) params.set('search', search);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        if (categoryId !== undefined && categoryId !== null && categoryId > 0) params.set('categoryId', String(categoryId));

        return BASE_URL + `/api/terms?${params.toString()}`;
    },

    // 용어 상세
    TERM_DETAIL: (id: number | string) => BASE_URL + `/api/terms/${id}`,    // 카테고리 목록
    CATEGORIES: ({ search, sort = 'name', order = 'ASC', isTopOnly }: { search?: string; sort?: string; order?: string; isTopOnly?: boolean } = {}) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        params.set('sort', sort);
        params.set('order', order);
        if (isTopOnly) params.set('isTopOnly', 'true');
        return BASE_URL + `/api/categories?${params.toString()}`;
    },
    QUIZ: BASE_URL + '/api/quiz',

    // 퀴즈 목록(복수) 엔드포인트 빌더
    QUIZZES_LIST: (params?: { termId?: string | number; types?: string[]; limit?: number; shuffle?: boolean }) => {
        const p = new URLSearchParams();
        if (params?.termId !== undefined) p.set('termId', String(params.termId));
        if (params?.types && params.types.length > 0) p.set('types', params.types.join(','));
        if (params?.limit !== undefined) p.set('limit', String(params.limit));
        if (typeof params?.shuffle === 'boolean') p.set('shuffle', String(params.shuffle));
        return BASE_URL + `/api/quizzes?${p.toString()}`;
    },

    // 퀴즈 통계 엔드포인트 빌더
    QUIZZES_STATS: (termId: string | number, types?: string[]) => {
        const p = new URLSearchParams();
        p.set('termId', String(termId));
        if (types && types.length > 0) p.set('types', types.join(','));
        return BASE_URL + `/api/quizzes/stats?${p.toString()}`;
    },

    // 퀴즈 결과 저장 엔드포인트
    QUIZ_RESULTS: BASE_URL + '/api/quizzes/results',

    FAVORITES: {
        // 즐겨찾기 생성
        CREATE: BASE_URL + '/api/favorites',
        // 즐겨찾기 삭제
        DELETE: (id: number, type: 'term' | 'quiz' | 'all') => BASE_URL + `/api/favorites/${id}?type=${type}`,
        // 즐겨찾기 목록 조회
        LIST: (type: 'term' | 'quiz' | 'all', page: number, size: number) => BASE_URL + `/api/favorites?type=${type}&page=${page}&size=${size}`,
        // 즐겨찾기 대상 조회
        TARGET: (targetId: number, type: string) => BASE_URL + `/api/favorites/target?targetId=${targetId}&type=${type}`,
    },
    AUTH: {
        LOGIN: BASE_URL + '/api/auth/login',
        LOGOUT: BASE_URL + '/api/auth/logout',
        REGISTER: BASE_URL + '/api/auth/register',
        USER: BASE_URL + '/api/auth/user',
        // 프로필 업데이트
        UPDATE_PROFILE: BASE_URL + '/api/auth/user/profile',
        // OAuth2 시작
        OAUTH2_START: (provider: string) => BASE_URL + `/api/auth/oauth2/${provider}`,
        // OAuth2 콜백
        OAUTH2_CALLBACK: (provider: string) => BASE_URL + `/api/auth/oauth2/${provider}/callback`,
    },
}