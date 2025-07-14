import { TermCategory } from '@/entities/category/categories';

export const categoriesMock: TermCategory[] = [
    // 주요 정신질환
    { id: 1, name: '주요 정신질환', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 2, name: '우울증', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 3, name: '불안장애', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 4, name: '조현병', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 5, name: '양극성장애', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 6, name: '강박장애', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 7, name: '공황장애', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 8, name: '외상후스트레스장애(PTSD)', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 9, name: '식이장애', parentCategory: { id: 1 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 심리치료/상담
    { id: 10, name: '심리치료/상담', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 11, name: '인지행동치료(CBT)', parentCategory: { id: 10 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 12, name: '정신분석/정신역동', parentCategory: { id: 10 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 13, name: '가족치료', parentCategory: { id: 10 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 14, name: '집단치료', parentCategory: { id: 10 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 15, name: '미술/음악/놀이치료', parentCategory: { id: 10 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 증상/행동
    { id: 16, name: '증상/행동', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 17, name: '감정/기분', parentCategory: { id: 16 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 18, name: '사고/인지', parentCategory: { id: 16 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 19, name: '행동/습관', parentCategory: { id: 16 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 20, name: '신체증상', parentCategory: { id: 16 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 발달/아동·청소년
    { id: 21, name: '발달/아동·청소년', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 22, name: '발달장애', parentCategory: { id: 21 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 23, name: 'ADHD', parentCategory: { id: 21 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 24, name: '자폐스펙트럼', parentCategory: { id: 21 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 약물/치료법
    { id: 25, name: '약물/치료법', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 26, name: '항우울제', parentCategory: { id: 25 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 27, name: '항불안제', parentCategory: { id: 25 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 28, name: '항정신병약물', parentCategory: { id: 25 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 29, name: '심리사회적 중재', parentCategory: { id: 25 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 자기이해/자기관리
    { id: 30, name: '자기이해/자기관리', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 31, name: '스트레스 관리', parentCategory: { id: 30 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 32, name: '회복탄력성', parentCategory: { id: 30 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 33, name: '자기돌봄', parentCategory: { id: 30 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 사회/문화/가족
    { id: 34, name: '사회/문화/가족', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 35, name: '가족관계', parentCategory: { id: 34 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 36, name: '사회적 지지', parentCategory: { id: 34 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 37, name: '직장/학교', parentCategory: { id: 34 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 기타
    { id: 38, name: '기타', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 39, name: '용어/진단기준', parentCategory: { id: 38 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 40, name: '법/제도', parentCategory: { id: 38 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 41, name: '정신건강 일반', parentCategory: { id: 38 } as TermCategory, createdAt: new Date('2024-01-01T00:00:00Z') },
];
