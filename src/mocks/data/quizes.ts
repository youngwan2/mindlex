import { QuizEntity, QuizOptionEntity } from "../../entities/quiz/quizes";
import { termsMock } from "./terms.mock";

export const mockQuizzes: QuizEntity[] = [
    {
        id: 1,
        termId: termsMock[0].id,
        question: "우울증의 약어는 무엇인가요?",
        type: "multiple_choice",
        difficulty: "easy",
        createdAt: new Date("2025-08-01T10:00:00Z"),
    },
    {
        id: 2,
        termId: termsMock[1].id,
        question: "불안장애의 주요 증상은 무엇인가요?",
        type: "short_answer",
        difficulty: "medium",
        createdAt: new Date("2025-08-02T12:00:00Z"),
    },
    {
        id: 3,
        termId: termsMock[2].id,
        question: "조현병은 현실과의 접촉이 어려워지는 만성 정신질환이다. (O/X)",
        type: "ox",
        difficulty: "easy",
        createdAt: new Date("2025-08-03T14:00:00Z"),
    },
    {
        id: 4,
        termId: termsMock[0].id,
        question: "빈칸을 채우세요: 우울증은 ______과 흥미 저하가 특징인 정신질환입니다.",
        type: "fill_blank",
        difficulty: "hard",
        createdAt: new Date("2025-08-04T16:00:00Z"),
    },
    {
        id: 5,
        termId: termsMock[1].id,
        question: "불안장애를 겪는 사람이 공공장소에서 갑작스러운 공황발작을 경험할 가능성이 높은 이유는 무엇인가요?",
        type: "short_answer",
        difficulty: "hard",
        createdAt: new Date("2025-08-05T10:00:00Z"),
    },
    {
        id: 6,
        termId: termsMock[2].id,
        question: "조현병 환자가 망상과 환각을 경험할 때, 가족이 취해야 할 적절한 대처 방법은 무엇인가요?",
        type: "short_answer",
        difficulty: "hard",
        createdAt: new Date("2025-08-06T12:00:00Z"),
    },
    {
        id: 7,
        termId: termsMock[0].id,
        question: "우울증의 주요 증상 중 하나인 흥미 저하를 극복하기 위한 방법으로 적절하지 않은 것은?",
        type: "multiple_choice",
        difficulty: "medium",
        createdAt: new Date("2025-08-07T14:00:00Z"),
    },
];

export const mockQuizOptions: QuizOptionEntity[] = [
    // 우울증 관련 보기
    { id: 1, quizId: 1, optionText: "MDD", isCorrect: true },
    { id: 2, quizId: 1, optionText: "AD", isCorrect: false },
    { id: 3, quizId: 1, optionText: "SCZ", isCorrect: false },

    // 조현병 관련 보기
    { id: 4, quizId: 3, optionText: "O", isCorrect: true },
    { id: 5, quizId: 3, optionText: "X", isCorrect: false },

    // 빈칸 채우기 관련 보기
    { id: 6, quizId: 4, optionText: "우울감", isCorrect: true },
    { id: 7, quizId: 4, optionText: "망상", isCorrect: false },
    { id: 8, quizId: 4, optionText: "불안", isCorrect: false },

    // 우울증 사례 기반 보기
    { id: 9, quizId: 7, optionText: "규칙적인 운동", isCorrect: false },
    { id: 10, quizId: 7, optionText: "사회적 고립", isCorrect: true },
    { id: 11, quizId: 7, optionText: "전문가 상담", isCorrect: false },
    { id: 12, quizId: 7, optionText: "취미 활동 참여", isCorrect: false },

    // 불안장애 사례 기반 보기
    { id: 13, quizId: 5, optionText: "공공장소에서의 불안감", isCorrect: true },
    { id: 14, quizId: 5, optionText: "사회적 고립의 증가", isCorrect: false },
    { id: 15, quizId: 5, optionText: "신체적 피로감", isCorrect: false },

    // 조현병 사례 기반 보기
    { id: 16, quizId: 6, optionText: "환자의 망상을 논리적으로 반박한다", isCorrect: false },
    { id: 17, quizId: 6, optionText: "환자의 감정을 공감하고 안정감을 제공한다", isCorrect: true },
    { id: 18, quizId: 6, optionText: "환자를 혼자 두어 자율성을 보장한다", isCorrect: false },
];