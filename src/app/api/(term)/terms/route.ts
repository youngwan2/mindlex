import { TermEntity } from "@/entities/term/Term";
import { FavoritesEntity } from "@/entities/favorite/favorites";
import { getDataSource } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";



/**
 * * 용어 목록을 조회하는 API
 * @param req - NextRequest 객체
 * @returns 
 */
export async function GET(req: NextRequest) {
    const ds = await getDataSource();

    const size = Number(req.nextUrl.searchParams.get("size")) || 20; // 페이지당 항목 수
    const page = Number(req.nextUrl.searchParams.get("page")) || 1; // 페이지 번호
    const sort = req.nextUrl.searchParams.get("sort") || "id"; // 정렬 기준
    const order = req.nextUrl.searchParams.get("order") || "ASC"; // 정렬 순서 (ASC 또는 DESC)
    const search = req.nextUrl.searchParams.get("search") || ""; // 검색어
    const startDate = req.nextUrl.searchParams.get("startDate") || ""; // 시작 날짜
    const endDate = req.nextUrl.searchParams.get("endDate") || ""; // 종료 날짜
    const userId = (await auth())?.user?.id || ""; // 현재 로그인한 사용자의 ID (없으면 빈 문자열)

    const termEntityRepo = ds.getRepository(TermEntity);
    let qb = termEntityRepo.createQueryBuilder('term');

    // 검색어(한글/영문/한자/약어/정의/설명 등) 필터
    if (search) {
        qb = qb.andWhere(
            `term.termKo ILIKE :search OR term.termEn ILIKE :search OR term.termHanja ILIKE :search OR term.abbreviation ILIKE :search OR term.definition ILIKE :search OR term.description ILIKE :search`,
            { search: `%${search}%` }
        );
    }

    // 생성일 범위 필터 (타임스탬프 기반)
    if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) {
            start.setHours(0, 0, 0, 0); // 시작일의 경우 00:00:00.000부터 포함
            qb = qb.andWhere('term.createdAt >= :startDate', { startDate: start });
        }
    }
    if (endDate) {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) {
            end.setHours(23, 59, 59, 999);// 종료일의 경우 23:59:59.999까지 포함
            qb = qb.andWhere('term.createdAt <= :endDate', { endDate: end });
        }
    }

    // 정렬 기준 및 순서
    if (sort && order) {
        qb = qb.orderBy(`term.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');

    }

    // relations: category 및 최상위 부모 카테고리까지 포함
    qb = qb.leftJoinAndSelect('term.category', 'category')
        .leftJoinAndSelect('category.parentCategory', 'parentCategory');

    // 조회 컬럼 선택
    qb = qb.select([
        'term.id',
        'term.termKo',
        'term.termEn',
        'term.termHanja',
        'term.definition',
        'term.description',
        'term.abbreviation',
        'term.createdAt',
        'term.visualUrl',
        'term.visualCode',
        'term.audioUrl',
        'term.isPublished',
        'category.id',
        'category.name',
        'category.description'
    ]);


    // 페이징 및 정렬
    qb = qb.orderBy('term.id', 'ASC')
        .offset(size * (page - 1))
        .limit(size);

    const [termList, total] = await qb.getManyAndCount(); // 용어 리스트

    // userId가 있을 경우, 해당 사용자의 term 북마크 목록 조회
    let favoriteTermIds: number[] = [];
    if (userId) {
        const favoriteRepo = ds.getRepository(FavoritesEntity);
        const favorites = await favoriteRepo.find({
            where: { userId, type: 'term' },
            select: ['targetId']
        });
        favoriteTermIds = favorites.map(f => f.targetId); // targetId 만 뽑아서 할당
    }

    // 각 term에 isFavorite 필드 추가
    const termsWithFavorite = termList.map(term => ({
        ...term,
        isFavorite: userId ? favoriteTermIds.includes(term.id) : false // 기존 리스트에 isFavorite 필드 추가
    }));

    return NextResponse.json({ terms: termsWithFavorite, total });
}

/**
 * * 용어를 생성하는 API
 * @param req - NextRequest 객체
 */