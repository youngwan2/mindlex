import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { QuizEntity } from "@/entities/quiz/quizes";

// 이 라우트는 특정 용어(termId)에 대한 퀴즈 통계(총 개수, 유형별 개수)를 반환합니다.
// 쿼리 파라미터:
// - termId: 필수, 단일 용어 ID
// - types: 선택적, 쉼표로 구분된 타입 필터 (예: "mc,ox")

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const termIdParam = searchParams.get("termId");
        const typesParam = searchParams.get("types");

        if (!termIdParam) {
            return NextResponse.json({ success: false, message: "termId가 필요합니다." }, { status: 400 });
        }

        const termId = Number(termIdParam);
        if (Number.isNaN(termId)) {
            return NextResponse.json({ success: false, message: "유효한 termId가 아닙니다." }, { status: 400 });
        }

        // 선택적 타입 필터 파싱
        const requestedTypes = typesParam ? typesParam.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) : null;

        const ds = await getDataSource();
        const repo = ds.getRepository(QuizEntity);

        // 기본적으로 해당 termId의 퀴즈들을 가져와서 타입별 카운트를 계산
        const qb = repo.createQueryBuilder("quiz").where("quiz.termId = :termId", { termId });

        if (requestedTypes && requestedTypes.length > 0) {
            // DB의 type 컬럼 값이 다양한 문자열을 가질 수 있으므로 단순 equals 보다는 LIKE 매칭을 사용
            const orWhere = requestedTypes.map((t, i) => {
                if (t === 'mc' || t === 'multiple' || t === 'multiple_choice') return `LOWER(quiz.type) LIKE :mc${i}`;
                if (t === 'ox') return `LOWER(quiz.type) LIKE :ox${i}`;
                if (t === 'short' || t === 'short_answer' || t === 'fill_blank') return `LOWER(quiz.type) LIKE :short${i}`;
                return `LOWER(quiz.type) LIKE :other${i}`;
            }).join(' OR ');

            qb.andWhere(`(${orWhere})`);

            // 파라미터 설정
            requestedTypes.forEach((t, i) => {
                if (t === 'mc' || t === 'multiple' || t === 'multiple_choice') qb.setParameter(`mc${i}`, `%multiple%`);
                else if (t === 'ox') qb.setParameter(`ox${i}`, `%ox%`);
                else if (t === 'short' || t === 'short_answer' || t === 'fill_blank') qb.setParameter(`short${i}`, `%short%`);
                else qb.setParameter(`other${i}`, `%${t}%`);
            });
        }

        const quizzes = await qb.getMany();

        // 타입 매핑 헬퍼
        function mapType(t?: string) {
            if (!t) return undefined;
            const s = String(t).toLowerCase();
            if (s.includes('multiple') || s === 'multiple_choice') return 'mc';
            if (s === 'ox') return 'ox';
            if (s.includes('short') || s === 'short_answer' || s === 'fill_blank' || s.includes('fill')) return 'short';
            return undefined;
        }

        const counts: Record<'mc' | 'ox' | 'short', number> = { mc: 0, ox: 0, short: 0 };

        // 각 퀴즈의 타입을 매핑하여 카운트
        // 타입이 undefined인 경우는 제외
        for (const q of quizzes) {
            // QuizEntity의 type은 string | undefined일 수 있으므로 안전하게 처리
            const qt = q && typeof (q as QuizEntity).type === 'string' ? (q as QuizEntity).type : undefined;
            const k = mapType(qt) as ('mc' | 'ox' | 'short' | undefined);
            if (k) counts[k]++;
        }

        return NextResponse.json({ success: true, totalCount: quizzes.length, counts });
    } catch (error) {
        console.error('퀴즈 통계 조회 중 오류:', error);
        return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
