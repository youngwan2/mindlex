// filepath: src/components/term/quiz-options/constants.tsx
// Provide concrete constants for quiz options used at runtime
export const VALID_TYPES = ['mc', 'ox', 'short', 'fill_blank'] as const;

export type QuizType = (typeof VALID_TYPES)[number];

export const TYPE_INFO: Record<QuizType, { label: string; iconKey: string; description?: string; difficulty?: string; color?: string }> = {
    mc: {
        label: '객관식',
        iconKey: 'edit',
        description: '보기 중 정답을 고르는 문제',
        difficulty: 'medium',
        color: '#0ea5a4'
    },
    ox: {
        label: 'OX',
        iconKey: 'checkCircle',
        description: '참/거짓을 판별하는 문제',
        difficulty: 'easy',
        color: '#84cc16'
    },
    short: {
        label: '단답형',
        iconKey: 'pencil',
        description: '짧은 텍스트로 답하는 문제',
        difficulty: 'hard',
        color: '#f97316'
    },
    fill_blank: {
        label: '빈칸 채우기',
        iconKey: 'list',
        description: '문장 속 빈칸을 채우는 문제',
        difficulty: 'medium',
        color: '#8b5cf6'
    }
};
