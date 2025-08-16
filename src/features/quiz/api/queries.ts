'use client'
import { useQuery } from '@tanstack/react-query'
import { globalGetFetcher } from '@/shared/global-fetcher'
import { API } from '@/shared/constants/api'

export type QuizStatsResponse = {
    success: true;
    totalCount: number;
    counts: Record<'mc' | 'ox' | 'short', number>;
} | { success: false; message?: string };

/**
 *  퀴즈 통계 조회 훅
 * - 특정 용어에 대한 퀴즈 통계를 조회합니다.
 * - 선택적으로 퀴즈 타입 필터를 적용할 수 있습니다.
 *
 * 필터 타입:
 * - 'mc' : 객관식
 * - 'ox' : OX 퀴즈
 * - 'short' : 단답형/빈칸 채우기
 *
 * 반환 값:
 * - success: true인 경우 totalCount와 counts 객체를 포함
 * - success: false인 경우 message에 오류 메시지 포함
 * @param termId 용어 ID
 * @param types 퀴즈 타입 필터 (예: ['mc', 'ox', 'short'])
 * - 'mc' : 객관식
 * @returns 
 */
export function useQuizStats(termId: string, types?: string[]) {
    return useQuery<QuizStatsResponse>({
        queryKey: ['quiz', 'stats', termId, types ? types.join(',') : 'all'],
        queryFn: async () => {
            const url = API.QUIZZES_STATS(termId, types);
            return (await globalGetFetcher(url)) as QuizStatsResponse;
        },
        enabled: !!termId
    });
}

export type QuizzesListResponse = {
    success: true;
    quizzes: unknown[];
    totalCount: number;
} | { success: false; message?: string };

export function useQuizzes(termId: string, options?: { types?: string[]; limit?: number; shuffle?: boolean }) {
    return useQuery<QuizzesListResponse>({
        queryKey: ['quiz', 'list', termId, options?.types?.join(','), options?.limit, options?.shuffle],
        queryFn: async () => {
            const url = API.QUIZZES_LIST({ termId, types: options?.types, limit: options?.limit, shuffle: options?.shuffle });
            return (await globalGetFetcher(url)) as QuizzesListResponse;
        },
        enabled: !!termId
    });
}
