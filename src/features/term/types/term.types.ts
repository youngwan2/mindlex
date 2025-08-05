export interface TermsApiType {
    page: number;
    size: number;
    sort: string;
    order: string;
    categoryId?: number; // 카테고리 ID (선택)
    search?: string;
    startDate?: string;
    endDate?: string;
}


export interface Term {
    id: number;
    termKo: string;
    termEn: string;
    termHanja: string;
    abbreviation: string;
    definition: string;
    description: string;
    visualType?: string; // 시각자료 타입 (image/mermaid/svg/none 등)
    visualUrl?: string;  // 시각자료(이미지/도식) 링크
    visualCode?: string; // mermaid/SVG 등 그래프 코드
    audioUrl?: string;   // 발음 듣기(음성 파일 링크)
    createdAt: string;
    updatedAt: string;
    category: {
        id: number;
        name: string;
        description: string;
    }
}

export interface HomeTermListProps {
    terms: Term[];  // 용어 목록
}