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

// // 즐겨찾기(북마크) 삭제
// export async function DELETE(req: NextRequest) {
//   const ds = await getDataSource();
//   const repo = ds.getRepository(FavoritesEntity);
//   const { userId, targetId, type } = await req.json();
//   if (!targetId || !type) {
//     return NextResponse.json({ error: 'targetId, type 필수' }, { status: 400 });
//   }
//   const result = await repo.delete({ userId: userId || 'guest', targetId, type });
//   return NextResponse.json({ success: result.affected > 0 });
// }

// 즐겨찾기 목록 조회 (GET /api/favorites?type=term&page=1&size=20)
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

    const [favorites, totalCount] = await repo.findAndCount({
        where: { userId, type },
        order: { createdAt: 'DESC' }, // 기본 최신순
        skip: (page - 1) * size,
        take: size,
    });
    return NextResponse.json({ favorites, totalCount });
}
