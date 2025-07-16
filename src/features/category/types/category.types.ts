export interface Category {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    children?: Category[]; // 하위 카테고리 목록
    parentCategory?: { id: number };
}

export interface CategoryListProps {
    categories: Category[];
}