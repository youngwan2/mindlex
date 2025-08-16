'use client'

import { useMutation } from '@tanstack/react-query'
import { globalPostFetcher } from '@/shared/global-fetcher'
import { API } from '@/shared/constants/api'

export type SaveQuizResultsPayload = { results: Array<{ quizId: number; isCorrect: boolean }> };

export function useSaveQuizResultsMutation() {
    return useMutation({
        mutationFn: (payload: SaveQuizResultsPayload) => globalPostFetcher(API.QUIZ_RESULTS, payload),
    });
}
