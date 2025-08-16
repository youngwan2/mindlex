export const VALID_TYPES = ['mc', 'ox', 'short'] as const;
export type QuizType = typeof VALID_TYPES[number];

export const TYPE_INFO: Record<QuizType, {
    label: string;
    iconKey: 'list' | 'checkCircle' | 'edit';
    description: string;
    difficulty: string;
    color: string;
}> = {
    mc: {
        label: '객관식',
        iconKey: 'list',
        description: '4개의 선택지 중 정답 선택',
        difficulty: '보통',
        color: 'from-blue-500 to-blue-600'
    },
    ox: {
        label: 'O/X 퀴즈',
        iconKey: 'checkCircle',
        description: '참/거짓 중 하나 선택',
        difficulty: '쉬움',
        color: 'from-green-500 to-green-600'
    },
    short: {
        label: '단답형',
        iconKey: 'edit',
        description: '직접 답안 작성',
        difficulty: '어려움',
        color: 'from-purple-500 to-purple-600'
    }
};
