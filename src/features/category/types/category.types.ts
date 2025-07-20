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