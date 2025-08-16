export const VALID_TYPES = ['mc', 'ox', 'short', 'fill_blank'] as const;
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
    },
    fill_blank: {
        label: '빈칸 채우기',
        iconKey: 'edit',
        description: '빈칸에 들어갈 단어나 구문을 작성',
        difficulty: '보통',
        color: 'from-yellow-500 to-yellow-600'
    }
};
