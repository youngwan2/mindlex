import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { QuizResultEntity } from '@/entities/quiz/quizes';
import { auth } from '@/auth';
import crypto from 'crypto';
import { In } from 'typeorm';

// 간단한 POST 엔드포인트: 퀴즈 결과(세션 단위)를 저장합니다.
// 바디 예시: { results: [{ quizId: 1, isCorrect: true }, ...] }

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { results } = body as { results?: Array<{ quizId: number; isCorrect: boolean }> };

        if (!Array.isArray(results) || results.length === 0) {
            return NextResponse.json({ success: false, message: 'results 배열이 필요합니다.' }, { status: 400 });
        }

        // 서버측에서 사용자 결정: 로그인된 사용자의 ID 사용, 없으면 anon 쿠키 사용
        const session = await auth();
        const existingAnon = req.cookies.get('anonId')?.value;
        let anonId = existingAnon;
        let setCookieHeader: string | undefined;

        if (!existingAnon) {
            anonId = `anon_${crypto.randomUUID()}`;
            const maxAge = 60 * 60 * 24 * 365 * 5; // 5년
            const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
            setCookieHeader = `anonId=${anonId}; Path=/; HttpOnly; ${secure}SameSite=Lax; Max-Age=${maxAge}`;
        }

        const userId = session?.user?.id || anonId || 'guest';

        const ds = await getDataSource();
        const repo = ds.getRepository(QuizResultEntity);

        // 중복 저장 방지/업데이트 로직
        // 유저로 부터 받은 results에서 quizId를 키로 사용하여 기존에 저장된 결과를 조회
        const quizIds = results.map(r => r.quizId);
        const existingRecords = await repo.find({ where: { userId, quizId: In(quizIds) } }); // 존재하는 기록들
        const existingMap = new Map<number, QuizResultEntity>(); // 기록을 맵 객체로 맵핑
        for (const rec of existingRecords) existingMap.set(rec.quizId, rec);

        const toInsert = [] as QuizResultEntity[]; // 새로 저장할 항목들
        const toUpdate: QuizResultEntity[] = []; // 업데이트할 항목들

        // results 배열을 순회하며 저장할 항목 결정
        for (const r of results) {
            const exist = existingMap.get(r.quizId);
            if (!exist) {
                // 새로 저장할 항목(없으면 새로 생성)
                toInsert.push(repo.create({ quizId: r.quizId, userId, isCorrect: !!r.isCorrect }));
            } else {
                // 이미 저장된 항목이 있으나, 기존 정답이 false(오답) 이고 새 결과(새 기록)가 true(정답)인 경우에만 갱신
                if (!exist.isCorrect && r.isCorrect) {
                    exist.isCorrect = true;
                    toUpdate.push(exist);
                }
            }
        }

        let inserted = 0;
        let updated = 0;

        // 데이터베이스에 저장
        // toInsert는 새로 생성할 항목들
        if (toInsert.length > 0) {
            const insertedEntities = await repo.save(toInsert);
            inserted = insertedEntities.length || toInsert.length;
        }

        // 업데이트할 항목이 있다면 저장
        // toUpdate는 기존 항목을 갱신할 항목들
        if (toUpdate.length > 0) {
            const updatedEntities = await repo.save(toUpdate);
            updated = updatedEntities.length || toUpdate.length;
        }

        const bodyResponse = { success: true, savedInserted: inserted, savedUpdated: updated };

        // Set-Cookie 헤더가 있다면 응답에 추가
        // 클라이언트에서 anonId 쿠키를 설정하여 추후 사용자 식별에 사용
        if (setCookieHeader) {
            return NextResponse.json(bodyResponse, { status: 200, headers: { 'Set-Cookie': setCookieHeader } });
        }

        // Set-Cookie 헤더가 없으면 단순 JSON 응답
        // 클라이언트에서 사용자 식별을 위해 다른 방법을 사용해야 함
        return NextResponse.json(bodyResponse);
    } catch (error) {
        console.error('퀴즈 결과 저장 중 오류:', error);
        return NextResponse.json({ success: false, message: '서버 오류' }, { status: 500 });
    }
}
