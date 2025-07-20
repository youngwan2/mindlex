import { TermCategoryEntity } from "@/entities/category/categories";
import { TermEntity } from "@/entities/term/Term";
import { getDataSource } from "@/lib/database";
import { NextResponse } from "next/server";

const { IsNull } = await import('typeorm');


/**
 * 모든 카테고리 목록을 조회하는 API
 * - 각 카테고리의 하위 카테고리도 포함
 * - 하위 카테고리는 2단계까지 포함
 */
export async function GET() {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(TermCategoryEntity);
    const termRepo = ds.getRepository(TermEntity);

    // 최상위(부모) 카테고리만 where: { parentCategory: IsNull() } 사용
    const categories = await categoryRepo.find({
        where: { parentCategory: IsNull() },
        select: ['id', 'name', 'level', 'children', 'description'],
        relations: ['children', 'children.children'],
        order: { id: 'ASC' },
    });

    const totalCount = await categoryRepo.count()

    // 모든 카테고리 id(최상위+2단계 자식) 추출
    const allCategoryIds = [
        ...categories.map(c => c.id),
        ...categories.flatMap(c => c.children?.map(ch => ch.id) || []),
        ...categories.flatMap(c => c.children?.flatMap(ch => ch.children?.map(grand => grand.id) || []) || [])
    ].filter(Boolean);

    // 카테고리별 용어 개수 집계
    const termCountsRaw = await termRepo
        .createQueryBuilder('term')
        .select('term.categoryId', 'categoryId')
        .addSelect('COUNT(*)', 'count')
        .where('term.categoryId IN (:...ids)', { ids: allCategoryIds })
        .groupBy('term.categoryId')
        .getRawMany();
    const termCountMap = Object.fromEntries(termCountsRaw.map(r => [Number(r.categoryId), Number(r.count)]));

    type TermCategoryWithChildren = TermCategoryEntity & { children?: TermCategoryWithChildren[]; termCount?: number };

    // termCount 필드 추가 (최상위+자식+손자 모두)
    function addTermCount(cat: TermCategoryWithChildren): TermCategoryWithChildren {
        return {
            ...cat,
            termCount: termCountMap[cat.id] || 0,
            children: cat.children?.map(addTermCount) || []
        };
    }
    const categoriesWithTermCount = categories.map(addTermCount);

    return NextResponse.json({ categories: categoriesWithTermCount, totalCount });
}