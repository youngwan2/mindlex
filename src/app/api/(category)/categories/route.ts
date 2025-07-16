import { TermCategoryEntity } from "@/entities/category/categories";
import { getDataSource } from "@/lib/database";
import { NextResponse } from "next/server";

const { IsNull } = await import('typeorm');


/**
 * 최상위 카테고리 목록을 조회하는 API
 * - 최상위 카테고리만 조회하며, 각 카테고리의 하위 카테고리도 포함
 * - 하위 카테고리는 2단계까지 포함
 */
export async function GET() {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(TermCategoryEntity);

    // 최상위(부모) 카테고리만 where: { parentCategory: IsNull() } 사용

    const categories = await categoryRepo.find({
        where: { parentCategory: IsNull() },
        select: ['id', 'name', 'children', 'description'], // 필요한 필드만 선택
        relations: ['children', 'children.children'], // 2단계까지 자식 포함
        order: { id: 'ASC' },
    });

    return NextResponse.json(categories);
}