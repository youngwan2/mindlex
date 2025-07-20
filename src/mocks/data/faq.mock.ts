import { FAQ, FAQCategory } from '@/features/faq/types/faq.types';
import { MdQuiz, MdSupportAgent, MdAccountCircle, MdBuild, MdHelp, MdMenuBook } from 'react-icons/md';

export const faqCategories: FAQCategory[] = [
    { name: 'all', label: '전체', icon: MdHelp, count: 0 },
    { name: 'general', label: '일반', icon: MdSupportAgent, count: 0 },
    { name: 'terms', label: '용어 관련', icon: MdMenuBook, count: 0 },
    { name: 'quiz', label: '퀴즈', icon: MdQuiz, count: 0 },
    { name: 'account', label: '계정/로그인', icon: MdAccountCircle, count: 0 },
    { name: 'technical', label: '기술 지원', icon: MdBuild, count: 0 },
];

export const faqMockData: FAQ[] = [
    // 일반 FAQ
    {
        id: 1,
        question: '마인드렉스는 무엇인가요?',
        answer: '마인드렉스는 정신건강 용어를 쉽고 체계적으로 학습할 수 있는 교육 플랫폼입니다. 복잡한 전문 용어들을 일반인도 쉽게 이해할 수 있도록 설명하고, 퀴즈를 통해 재미있게 학습할 수 있습니다.',
        category: 'general',
        tags: ['소개', '플랫폼'],
        isPopular: true,
        createdAt: new Date('2024-01-01'),
    },
    {
        id: 2,
        question: '누가 이 서비스를 이용할 수 있나요?',
        answer: '정신건강에 관심 있는 모든 분들이 이용하실 수 있습니다. 특히 심리학이나 상담학 전공자, 정신건강 관련 업무 종사자, 또는 개인적으로 정신건강에 대해 더 알고 싶은 일반인들에게 유용합니다.',
        category: 'general',
        tags: ['대상', '이용자'],
        isPopular: true,
        createdAt: new Date('2024-01-02'),
    },
    {
        id: 3,
        question: '서비스 이용료가 있나요?',
        answer: '기본적인 용어 검색과 학습은 무료로 이용하실 수 있습니다. 일부 고급 기능이나 프리미엄 콘텐츠는 추후 유료 서비스로 제공될 예정입니다.',
        category: 'general',
        tags: ['요금', '무료', '유료'],
        createdAt: new Date('2024-01-03'),
    },

    // 용어 관련 FAQ
    {
        id: 4,
        question: '용어가 정확한가요? 어떤 기준으로 작성되었나요?',
        answer: '모든 용어와 설명은 정신건강 전문가들의 검토를 거쳐 작성되었습니다. 주요 참고 자료로는 DSM-5, ICD-11, 그리고 국내외 정신건강 관련 학술 자료들을 사용했습니다.',
        category: 'terms',
        tags: ['정확성', '전문가', '검증'],
        isPopular: true,
        createdAt: new Date('2024-01-04'),
    },
    {
        id: 5,
        question: '새로운 용어를 제안할 수 있나요?',
        answer: '네, 언제든지 새로운 용어를 제안해주세요. 문의하기 페이지나 이메일을 통해 제안해주시면, 전문가 검토 후 반영하겠습니다.',
        category: 'terms',
        tags: ['제안', '추가', '용어'],
        createdAt: new Date('2024-01-05'),
    },
    {
        id: 6,
        question: '용어 설명이 이해하기 어려워요.',
        answer: '더 쉬운 설명이 필요하시다면 해당 용어 페이지에서 피드백을 남겨주세요. 사용자 피드백을 바탕으로 설명을 지속적으로 개선하고 있습니다.',
        category: 'terms',
        tags: ['설명', '피드백', '개선'],
        createdAt: new Date('2024-01-06'),
    },

    // 퀴즈 FAQ
    {
        id: 7,
        question: '퀴즈 난이도는 어떻게 결정되나요?',
        answer: '퀴즈에는 난이도가 존재하지 않습니다. 따라서 학습이 필요한 용어를 선택하여 퀴즈를 풀기만 하면 됩니다. ',
        category: 'quiz',
        tags: ['난이도', '레벨', '적응형'],
        isPopular: true,
        createdAt: new Date('2024-01-07'),
    },
    {
        id: 8,
        question: '퀴즈 결과가 저장되나요?',
        answer: '로그인한 사용자의 퀴즈 결과는 자동으로 저장되어 학습 진도를 추적할 수 있습니다. 게스트 사용자의 경우 세션이 종료되면 결과가 사라집니다.',
        category: 'quiz',
        tags: ['저장', '진도', '추적'],
        createdAt: new Date('2024-01-08'),
    },
    {
        id: 9,
        question: '틀린 문제를 다시 풀 수 있나요?',
        answer: '네, 마이페이지의 "틀린 문제 모음"에서 이전에 틀린 문제들을 다시 풀어볼 수 있습니다. 약점을 보완하는 데 도움이 됩니다.',
        category: 'quiz',
        tags: ['복습', '틀린문제', '약점'],
        createdAt: new Date('2024-01-09'),
    },

    // 계정/로그인 FAQ
    {
        id: 10,
        question: '회원가입 없이도 이용할 수 있나요?',
        answer: '기본적인 용어 검색과 일부 퀴즈는 회원가입 없이도 이용하실 수 있습니다. 하지만 학습 진도 저장, 개인화된 추천 등의 기능을 위해서는 회원가입이 필요합니다.',
        category: 'account',
        tags: ['회원가입', '게스트', '기능'],
        isPopular: true,
        createdAt: new Date('2024-01-10'),
    },
    {
        id: 11,
        question: '비밀번호를 잊었어요.',
        answer: '로그인 페이지의 "비밀번호 찾기"를 클릭하시면 등록된 이메일로 비밀번호 재설정 링크를 보내드립니다.',
        category: 'account',
        tags: ['비밀번호', '찾기', '재설정'],
        createdAt: new Date('2024-01-11'),
    },
    {
        id: 12,
        question: '소셜 로그인이 지원되나요?',
        answer: '현재 구글, 카카오, 네이버 소셜 로그인을 지원합니다. 추후 더 많은 소셜 로그인 옵션을 추가할 예정입니다.',
        category: 'account',
        tags: ['소셜로그인', '구글', '카카오', '네이버'],
        createdAt: new Date('2024-01-12'),
    },

    // 기술 지원 FAQ
    {
        id: 13,
        question: '어떤 브라우저에서 이용할 수 있나요?',
        answer: 'Chrome, Firefox, Safari, Edge 등 주요 브라우저에서 모두 이용하실 수 있습니다. 최신 버전 사용을 권장합니다.',
        category: 'technical',
        tags: ['브라우저', '호환성', '지원'],
        createdAt: new Date('2024-01-13'),
    },
    {
        id: 14,
        question: '모바일에서도 이용할 수 있나요?',
        answer: '네, 반응형 웹 디자인으로 제작되어 모바일, 태블릿에서도 편리하게 이용하실 수 있습니다. 모바일 앱은 현재 개발 중입니다.',
        category: 'technical',
        tags: ['모바일', '반응형', '앱'],
        createdAt: new Date('2024-01-14'),
    },
    {
        id: 15,
        question: '페이지가 느리게 로딩돼요.',
        answer: '네트워크 상태를 확인해보시고, 브라우저 캐시를 삭제해보세요. 지속적으로 문제가 발생하면 고객지원팀에 문의해주세요.',
        category: 'technical',
        tags: ['성능', '로딩', '캐시'],
        createdAt: new Date('2024-01-15'),
    },
];

// 카테고리별 FAQ 개수 업데이트
faqCategories.forEach(category => {
    if (category.name === 'all') {
        category.count = faqMockData.length;
    } else {
        category.count = faqMockData.filter(faq => faq.category === category.name).length;
    }
});
