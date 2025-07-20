import { TermCategoryEntity } from '@/entities/category/categories';

export const categoriesMock: TermCategoryEntity[] = [    // 주요 정신질환
    { id: 1, name: '주요 정신질환', description: '일상생활에 지장을 주는 주요 정신질환들을 체계적으로 분류했습니다. 우울증, 불안장애, 조현병 등의 증상과 치료 방법을 이해할 수 있습니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 2, name: '우울증', description: '지속적인 우울감과 의욕 저하 등으로 일상생활에 어려움을 겪는 대표적 정신질환입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 3, name: '불안장애', description: '과도한 불안과 걱정이 일상에 영향을 미치는 장애로, 다양한 하위 유형이 존재합니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 4, name: '조현병', description: '현실과의 괴리, 망상, 환청 등 인지와 감정, 행동에 광범위한 영향을 주는 질환입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 5, name: '양극성장애', description: '조증과 우울증이 반복적으로 나타나며, 기분의 극단적 변동이 특징입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 6, name: '강박장애', description: '원하지 않는 생각(강박사고)과 반복적 행동(강박행동)이 일상에 불편을 줍니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 7, name: '공황장애', description: '예기치 못한 극심한 불안 발작이 반복적으로 발생하는 장애입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 8, name: '외상후스트레스장애(PTSD)', description: '외상 경험 이후에도 오랜 기간 심리적 고통과 스트레스를 겪는 장애입니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 9, name: '식이장애', description: '섭식 행동에 이상이 나타나며, 신체 이미지와 관련된 다양한 문제를 포함합니다.', parentCategory: { id: 1 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },

    // 심리치료/상담
    { id: 10, name: '심리치료/상담', description: '심리적 어려움을 해결하고 정서적 안정을 돕기 위한 다양한 치료와 상담 방법을 안내합니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 11, name: '인지행동치료(CBT)', description: '비합리적인 생각과 행동을 변화시켜 심리적 문제를 개선하는 대표적 치료법입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 12, name: '정신분석/정신역동', description: '무의식의 갈등과 과거 경험을 탐색하여 심리적 문제의 원인을 이해하고 해결합니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 13, name: '가족치료', description: '가족 구성원 간의 상호작용을 개선하여 가족 전체의 건강을 증진하는 치료입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 14, name: '집단치료', description: '비슷한 어려움을 겪는 여러 사람이 함께 참여하여 상호 지지와 성장을 도모합니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 15, name: '미술/음악/놀이치료', description: '예술적 매체를 활용해 감정 표현과 심리적 치유를 돕는 다양한 치료법입니다.', parentCategory: { id: 10 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },

    // 증상/행동
    { id: 16, name: '증상/행동', description: '정신건강과 관련된 다양한 증상과 행동 변화를 이해하고 관리하는 데 도움을 줍니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 17, name: '감정/기분', description: '감정과 기분의 변화가 일상과 관계에 미치는 영향을 안내합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 18, name: '사고/인지', description: '사고방식과 인지 기능의 변화가 정신건강에 미치는 영향을 다룹니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 19, name: '행동/습관', description: '행동 패턴과 습관의 변화가 삶의 질에 미치는 영향을 설명합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 20, name: '신체증상', description: '정신적 어려움이 신체적으로 나타날 수 있는 다양한 증상을 안내합니다.', parentCategory: { id: 16 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },    // 발달/아동·청소년
    { id: 21, name: '발달/아동·청소년', description: '아동과 청소년의 건강한 성장과 발달을 돕는 정신건강 정보입니다. ADHD, 자폐스펙트럼 등 발달 관련 이슈를 다룹니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 22, name: '발달장애', description: '발달 과정에서의 어려움이나 지연, 특이 행동 등을 포함하는 장애입니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 23, name: 'ADHD', description: '주의력 부족과 과잉행동, 충동성이 주요 특징인 아동·청소년기 장애입니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 24, name: '자폐스펙트럼', description: '사회적 상호작용과 의사소통에 어려움이 있는 신경발달장애입니다.', parentCategory: { id: 21 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },    // 약물/치료법
    { id: 25, name: '약물/치료법', description: '정신건강 회복을 위한 과학적이고 안전한 약물 치료와 다양한 치료법을 소개합니다. 전문의와의 상담이 필요한 정보들을 포함합니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 26, name: '항우울제', description: '우울증 등 기분장애 치료에 주로 사용되는 약물로, 다양한 종류가 있습니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 27, name: '항불안제', description: '불안 증상 완화에 사용되는 약물로, 신중한 복용이 필요합니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 28, name: '항정신병약물', description: '조현병 등 정신질환 치료에 사용되는 약물로, 증상에 따라 처방됩니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 29, name: '심리사회적 중재', description: '심리적·사회적 접근을 통해 증상 완화와 회복을 돕는 다양한 치료 방법입니다.', parentCategory: { id: 25 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },    // 자기이해/자기관리
    { id: 30, name: '자기이해/자기관리', description: '자신의 감정과 마음을 이해하고, 스트레스를 건강하게 관리하는 실용적인 방법들을 제공합니다. 일상에서 바로 적용할 수 있는 자기돌봄법을 배워보세요.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 31, name: '스트레스 관리', description: '스트레스를 효과적으로 해소하고 관리하는 실질적인 방법을 안내합니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 32, name: '회복탄력성', description: '역경과 스트레스 상황에서 빠르게 회복하는 심리적 힘을 키우는 방법을 다룹니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 33, name: '자기돌봄', description: '신체적·정신적 건강을 위한 자기돌봄 실천법을 소개합니다.', parentCategory: { id: 30 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },    // 사회/문화/가족
    { id: 34, name: '사회/문화/가족', description: '가족, 직장, 학교 등 우리 삶의 중요한 관계와 환경에서의 정신건강을 다룹니다. 사회적 지지와 건강한 관계 형성법을 알아보세요.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 35, name: '가족관계', description: '가족 구성원 간의 관계와 소통, 갈등 해결 방법을 안내합니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 36, name: '사회적 지지', description: '사회적 관계망과 지지체계가 정신건강에 미치는 긍정적 영향을 설명합니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 37, name: '직장/학교', description: '직장과 학교 등 주요 사회 환경에서의 적응과 스트레스 관리 방법을 다룹니다.', parentCategory: { id: 34 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },

    // 기타
    { id: 38, name: '기타', description: '정신건강과 관련된 기타 다양한 주제와 분류를 포함합니다.', createdAt: new Date('2024-01-01T00:00:00Z'), level: 1 },
    { id: 39, name: '용어/진단기준', description: '정신건강 용어와 진단 기준에 대한 이해를 돕는 정보를 제공합니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 40, name: '법/제도', description: '정신건강과 관련된 법률 및 제도, 정책 정보를 안내합니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
    { id: 41, name: '정신건강 일반', description: '정신건강 전반에 대한 기본 개념과 실생활 적용 정보를 제공합니다.', parentCategory: { id: 38 } as TermCategoryEntity, createdAt: new Date('2024-01-01T00:00:00Z'), level: 2 },
];
