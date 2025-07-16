import { TermCategoryEntity } from '@/entities/category/categories';

export const categoriesMock: TermCategoryEntity[] = [
    // 주요 정신질환
    { id: 1, name: '주요 정신질환', description: '정신질환의 대표적인 분류입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 2, name: '우울증', description: '우울감과 의욕저하 등 주요 증상을 포함하고 있습니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 3, name: '불안장애', description: '과도한 불안과 걱정이 특징입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 4, name: '조현병', description: '현실과의 괴리, 망상, 환청 등이 나타납니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 5, name: '양극성장애', description: '조증과 우울증이 반복됩니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 6, name: '강박장애', description: '강박사고와 강박행동이 반복됩니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 7, name: '공황장애', description: '갑작스럽고 극심한 불안 발작이 발생합니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 8, name: '외상후스트레스장애(PTSD)', description: '외상 경험 후 지속적으로 스트레스를 받으실 수 있습니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 9, name: '식이장애', description: '섭식 행동에 이상이 나타납니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 심리치료/상담
    { id: 10, name: '심리치료/상담', description: '심리적 문제 해결을 위한 치료 및 상담입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 11, name: '인지행동치료(CBT)', description: '생각과 행동을 변화시키는 치료입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 12, name: '정신분석/정신역동', description: '무의식 탐색을 중심으로 하는 치료입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 13, name: '가족치료', description: '가족 내 상호작용을 개선하는 치료입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 14, name: '집단치료', description: '여러 명이 함께 참여하는 치료입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 15, name: '미술/음악/놀이치료', description: '예술적 매체를 활용하여 치료를 진행합니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 증상/행동
    { id: 16, name: '증상/행동', description: '정신건강과 관련된 증상 및 행동입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 17, name: '감정/기분', description: '감정 및 기분의 변화를 의미합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 18, name: '사고/인지', description: '사고 및 인지 기능의 변화를 의미합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 19, name: '행동/습관', description: '행동 및 습관의 변화를 의미합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 20, name: '신체증상', description: '신체적으로 나타나는 증상입니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 발달/아동·청소년
    { id: 21, name: '발달/아동·청소년', description: '발달 및 아동·청소년과 관련된 내용입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 22, name: '발달장애', description: '발달 과정에서 이상이 발생할 수 있습니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 23, name: 'ADHD', description: '주의력결핍 및 과잉행동이 나타납니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 24, name: '자폐스펙트럼', description: '사회적 상호작용 및 의사소통에 어려움이 있습니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 약물/치료법
    { id: 25, name: '약물/치료법', description: '정신건강과 관련된 약물 및 치료법입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 26, name: '항우울제', description: '우울증 치료에 사용되는 약물입니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 27, name: '항불안제', description: '불안장애 치료에 사용되는 약물입니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 28, name: '항정신병약물', description: '조현병 등 치료에 사용되는 약물입니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 29, name: '심리사회적 중재', description: '심리사회적 접근을 통한 치료 방법입니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 자기이해/자기관리
    { id: 30, name: '자기이해/자기관리', description: '자기이해 및 자기관리에 관한 내용입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 31, name: '스트레스 관리', description: '스트레스를 해소하고 관리하는 방법입니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 32, name: '회복탄력성', description: '역경을 극복하고 회복하는 힘을 의미합니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 33, name: '자기돌봄', description: '자기 자신을 돌보는 방법에 대해 안내합니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 사회/문화/가족
    { id: 34, name: '사회/문화/가족', description: '사회, 문화, 가족과 관련된 내용입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 35, name: '가족관계', description: '가족 내 관계와 상호작용에 대해 설명합니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 36, name: '사회적 지지', description: '사회적 관계망과 지원에 대해 안내합니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 37, name: '직장/학교', description: '직장 및 학교 환경에 관한 내용입니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },

    // 기타
    { id: 38, name: '기타', description: '기타 분류에 해당하는 내용입니다.', createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 39, name: '용어/진단기준', description: '정신건강 용어 및 진단 기준에 대해 안내합니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 40, name: '법/제도', description: '정신건강 관련 법과 제도에 대해 설명합니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
    { id: 41, name: '정신건강 일반', description: '정신건강 전반에 대한 내용을 포함하고 있습니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z') },
];
