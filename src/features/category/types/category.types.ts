export interface Category {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    level: number; // 카테고리 계층 레벨
    children?: Category[]; // 하위 카테고리 목록
    parentCategory?: { id: number };
    termCount?: number; // 카테고리별 용어 개수(선택)
}

export interface CategoryListProps {
    categories: Category[];
}

/**
 * 카테고리 검색 파라미터 인터페이스
 * - search: 검색어 (카테고리명, 설명)
 * - sort: 정렬 기준 (name, termCount, createdAt)
 * - order: 정렬 순서 (ASC, DESC)
 * - isTopOnly: 최상위 카테고리만 조회 여부
 */
export interface CategorySearchParams {
    search?: string;
    sort?: 'name' | 'termCount' | 'createdAt';
    order?: 'ASC' | 'DESC';
    isTopOnly?: boolean; // 최상위 카테고리만 조회
}