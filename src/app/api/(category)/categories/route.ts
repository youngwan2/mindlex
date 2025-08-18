import { TermCategoryEntity } from "@/entities/category/categories";
import { TermEntity } from "@/entities/term/Term";
import { getDataSource } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";


/**
 * 카테고리 목록을 조회하는 API
 * - 검색, 정렬, 필터링 기능 지원
 * - 하위 카테고리는 2단계까지 포함
 * @param req - NextRequest 객체
 */
export async function GET(req: NextRequest) {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(TermCategoryEntity);
    const termRepo = ds.getRepository(TermEntity);

    // 쿼리 파라미터 파싱
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'name';
    const order = searchParams.get('order') || 'ASC';
    const isTopOnly = searchParams.get('isTopOnly') === 'true';

    // 기본 쿼리 빌더 생성
    let queryBuilder = categoryRepo.createQueryBuilder('category');

    // 최상위 카테고리만 또는 전체 카테고리
    if (isTopOnly) {
        queryBuilder = queryBuilder.where('category.parentCategory IS NULL');
    } else {
        queryBuilder = queryBuilder.where('category.parentCategory IS NULL');
    }

    // 검색 조건 추가
    if (search) {
        queryBuilder = queryBuilder.andWhere(
            '(category.name LIKE :search OR category.description LIKE :search)',
            { search: `%${search}%` }
        );
    }

    // relations 추가 (isTopOnly가 false인 경우에만 children 포함)
    if (!isTopOnly) {
        queryBuilder = queryBuilder
            .leftJoinAndSelect('category.children', 'children')
            .leftJoinAndSelect('children.children', 'grandChildren');
    }

    // 정렬 조건 추가
    let orderByClause: string;
    switch (sort) {
        case 'name':
            orderByClause = 'category.name';
            break;
        case 'termCount':
            // termCount는 나중에 추가되므로 임시로 name으로 정렬
            orderByClause = 'category.name';
            break;
        case 'createdAt':
            orderByClause = 'category.createdAt';
            break;
        default:
            orderByClause = 'category.name';
    }

    queryBuilder = queryBuilder.orderBy(orderByClause, order as 'ASC' | 'DESC');

    // 카테고리 조회
    const categories = await queryBuilder.getMany();
    const totalCount = await categoryRepo.count();

    // 용어 개수 집계를 위한 모든 카테고리 ID 추출
    const allCategoryIds = [
        ...categories.map(c => c.id),
        ...categories.flatMap(c => c.children?.map(ch => ch.id) || []),
        ...categories.flatMap(c => c.children?.flatMap(ch => ch.children?.map(grand => grand.id) || []) || [])
    ].filter(Boolean);

    // 카테고리별 용어 개수 집계
    let termCountMap: Record<number, number> = {};
    if (allCategoryIds.length > 0) {
        const termCountsRaw = await termRepo
            .createQueryBuilder('term')
            .select('term.categoryId', 'categoryId')
            .addSelect('COUNT(*)', 'count')
            .where('term.categoryId IN (:...ids)', { ids: allCategoryIds })
            .groupBy('term.categoryId')
            .getRawMany();
        termCountMap = Object.fromEntries(termCountsRaw.map(r => [Number(r.categoryId), Number(r.count)]));
    }

    type TermCategoryWithChildren = TermCategoryEntity & { children?: TermCategoryWithChildren[]; termCount?: number };

    // termCount 필드 추가 함수
    function addTermCount(cat: TermCategoryWithChildren): TermCategoryWithChildren {
        return {
            ...cat,
            termCount: termCountMap[cat.id] || 0,
            children: cat.children?.map(addTermCount) || []
        };
    } let categoriesWithTermCount = categories.map(addTermCount);

    // termCount로 정렬하는 경우 후처리
    if (sort === 'termCount') {
        categoriesWithTermCount = categoriesWithTermCount.sort((a, b) => {
            const aCount = a.termCount || 0;
            const bCount = b.termCount || 0;
            return order === 'ASC' ? aCount - bCount : bCount - aCount;
        });
    }

    return NextResponse.json({
        categories: categoriesWithTermCount,
        totalCount,
        searchParams: {
            search,
            sort,
            order,
            isTopOnly
        }
    });
}