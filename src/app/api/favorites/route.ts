import { NextRequest, NextResponse } from 'next/server';
import { FavoritesEntity } from '@/entities/favorite/favorites';
import { getDataSource } from '@/lib/database';
import { auth } from '@/auth';

// 즐겨찾기(북마크) 생성
export async function POST(req: NextRequest) {
    const { targetId, type } = await req.json();

    const session = await auth();
    const userId = session?.user?.id

    if (!session) {
        return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(FavoritesEntity);

    if (!targetId || !type) {
        return NextResponse.json({ error: 'targetId, type 필수' }, { status: 400 });
    }
    const favorite = repo.create({ userId: userId || 'guest', targetId, type });
    try {
        await repo.save(favorite);
        return NextResponse.json({ success: true, favorite });
    } catch (error) {
        if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
            return NextResponse.json({ error: '이미 북마크된 항목입니다.' }, { status: 409 });
        }
        return NextResponse.json({ error: '네트워크 에러 입니다.' }, { status: 500 });
    }
}

// 즐겨찾기(북마크) 삭제
export async function DELETE(req: NextRequest) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session) {
        return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(FavoritesEntity);
    const { targetId, type } = await req.json();

    if (!targetId || !type) {
        return NextResponse.json({ error: 'targetId, type 필수' }, { status: 400 });
    }

    const result = await repo.delete({ userId, targetId, type });
    return NextResponse.json({ success: result.affected! > 0 }); // 삭제된 행이 있으면 success: true
}

// 즐겨찾기 목록 조회 (GET /api/favorites?type=term&page=1&size=20&search=검색어)
export async function GET(req: NextRequest) {
    const session = await auth();
    const userId = session?.user?.id

    if (!session) {
        return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(FavoritesEntity);
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'term';
    const page = Number(searchParams.get('page') || 1);
    const size = Number(searchParams.get('size') || 20);
    const search = searchParams.get('search') || '';


    // 기본 쿼리 빌더 생성 - getRawMany() 사용을 위해 alias 지정
    let queryBuilder = repo.createQueryBuilder('favorites')
        .select([
            'favorites.id as favorites_id',
            'favorites.userId as favorites_userId',
            'favorites.targetId as favorites_targetId',
            'favorites.type as favorites_type',
            'favorites.createdAt as favorites_createdAt'
        ])
        .where('favorites.userId = :userId', { userId });

    // type이 'all'이 아닌 경우에만 type 필터 추가
    if (type !== 'all') {
        queryBuilder = queryBuilder.andWhere('favorites.type = :type', { type });
    }

    // term 타입이거나 all인 경우 용어 정보 join
    if (type === 'term' || type === 'all') {
        queryBuilder = queryBuilder
            .leftJoin('terms', 'terms', 'terms.id = favorites.targetId AND favorites.type = :termType', { termType: 'term' })
            .addSelect([
                'terms.id as terms_id',
                'terms.termKo as terms_termKo',
                'terms.termEn as terms_termEn',
                'terms.termHanja as terms_termHanja',
                'terms.definition as terms_definition',
                'terms.description as terms_description',
                'terms.abbreviation as terms_abbreviation',
                'terms.createdAt as terms_createdAt',
                'terms.isPublished as terms_isPublished'
            ]);
    }
    // quiz 타입이거나 all인 경우 퀴즈 정보 join - quizs 테이블이 없어서 임시 주석처리
    /*
    if (type === 'quiz' || type === 'all') {
        queryBuilder = queryBuilder
            .leftJoin('quizs', 'quizs', 'quizs.id = favorites.targetId AND favorites.type = :quizType', { quizType: 'quiz' })
            .addSelect([
                'quizs.id as quizs_id',
                'quizs.title as quizs_title',
                'quizs.question as quizs_question',
                'quizs.createdAt as quizs_createdAt'
            ]);
    }
    */    // 검색어가 있는 경우, 관련 엔티티에서 검색
    if (search) {
        const searchConditions = [];

        if (type === 'term' || type === 'all') {
            searchConditions.push('(favorites.type = \'term\' AND (terms.termKo LIKE :search OR terms.termEn LIKE :search OR terms.definition LIKE :search))');
        }

        // quiz 검색 조건 - quizs 테이블이 없어서 임시 주석처리
        /*
        if (type === 'quiz' || type === 'all') {
            searchConditions.push('(favorites.type = \'quiz\' AND (quizs.title LIKE :search OR quizs.question LIKE :search))');
        }
        */

        if (searchConditions.length > 0) {
            queryBuilder = queryBuilder
                .andWhere(`(${searchConditions.join(' OR ')})`, { search: `%${search}%` });
        }
    }

    // 정렬, 페이지네이션 적용
    queryBuilder = queryBuilder
        .orderBy('favorites.createdAt', 'DESC')
        .skip((page - 1) * size)
        .take(size);    // 각 타입별 전체 개수 조회
    const totalCountTerm = await repo.count({ where: { userId, type: 'term' } });
    const totalCountQuiz = await repo.count({ where: { userId, type: 'quiz' } });

    // 현재 타입별 검색 조건에 맞는 개수 조회를 위한 별도 쿼리 빌더
    let countQueryBuilder = repo.createQueryBuilder('favorites')
        .where('favorites.userId = :userId', { userId });

    // type이 'all'이 아닌 경우에만 type 필터 추가
    if (type !== 'all') {
        countQueryBuilder = countQueryBuilder.andWhere('favorites.type = :type', { type });
    }

    // 검색어가 있는 경우 join 및 검색 조건 추가
    if (search) {
        if (type === 'term' || type === 'all') {
            countQueryBuilder = countQueryBuilder
                .leftJoin('terms', 'terms', 'terms.id = favorites.targetId AND favorites.type = :termType', { termType: 'term' });
        }
        // quiz join - quizs 테이블이 없어서 임시 주석처리
        /*
        if (type === 'quiz' || type === 'all') {
            countQueryBuilder = countQueryBuilder
                .leftJoin('quizs', 'quizs', 'quizs.id = favorites.targetId AND favorites.type = :quizType', { quizType: 'quiz' });
        }
        */

        const searchConditions = [];
        if (type === 'term' || type === 'all') {
            searchConditions.push('(favorites.type = \'term\' AND (terms.termKo LIKE :search OR terms.termEn LIKE :search OR terms.definition LIKE :search))');
        }
        // quiz 검색 조건 - quizs 테이블이 없어서 임시 주석처리
        /*
        if (type === 'quiz' || type === 'all') {
            searchConditions.push('(favorites.type = \'quiz\' AND (quizs.title LIKE :search OR quizs.question LIKE :search))');
        }
        */

        if (searchConditions.length > 0) {
            countQueryBuilder = countQueryBuilder
                .andWhere(`(${searchConditions.join(' OR ')})`, { search: `%${search}%` });
        }
    }

    const totalCount = await countQueryBuilder.getCount();    // 기존 쿼리로 목록 조회 - getRawMany()를 사용하여 join된 raw 데이터 가져오기
    const rawResults = await queryBuilder.getRawMany();

    // favorites 데이터에 join된 term/quiz 정보를 포함시키기 위해 가공
    interface FavoriteRaw {
        favorites_id: number;
        favorites_userid: string;
        favorites_targetid: number;
        favorites_type: 'term' | 'quiz';
        favorites_createdat: string;
        terms_id?: number;
        terms_termko?: string;
        terms_termen?: string;
        terms_termhanja?: string;
        terms_definition?: string;
        terms_description?: string;
        terms_abbreviation?: string;
        terms_ispublished?: boolean;
    }

    const processedFavorites = rawResults.map((row: FavoriteRaw) => {
        const result = {
            id: row.favorites_id,
            userId: row.favorites_userid,
            targetId: row.favorites_targetid,
            type: row.favorites_type,
            createdAt: row.favorites_createdat,
        };

        // term 정보가 있으면 추가 (row.terms_id가 존재하는 경우)
        if (row.terms_id) {
            return {
                ...result,
                termKo: row.terms_termko,
                termEn: row.terms_termen,
                termHanja: row.terms_termhanja,
                definition: row.terms_definition,
                description: row.terms_description,
                abbreviation: row.terms_abbreviation,
                isPublished: row.terms_ispublished,
            };
        }

        // quiz 정보가 있으면 추가 (row.quizs_id가 존재하는 경우) - quizs 테이블이 없어서 임시 주석처리
        /*
        if (row.quizs_id) {
            return {
                ...result,
                title: row.quizs_title,
                question: row.quizs_question,
            };
        }
        */

        return result;
    });



    return NextResponse.json({ favorites: processedFavorites, totalCount, totalCountTerm, totalCountQuiz });
}
