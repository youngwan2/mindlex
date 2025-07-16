

export interface TermsApiType {
    page: number;
    size: number;
    sort: string;
    order: string;
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