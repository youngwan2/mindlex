import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { QuizEntity } from "@/entities/quiz/quizes";
import { normalizeRequestedTypes, mapType } from '@/lib/quizTypes';

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

        // 선택적 타입 필터 파싱(원본 문자열을 정규화하여 배열 또는 null 반환)
        const requestedTypes = typesParam ? typesParam.split(",").map(t => String(t).trim()).filter(Boolean) : null;

        // 데이터소스 및 리포지토리 초기화
        const ds = await getDataSource();
        const repo = ds.getRepository(QuizEntity);
        // 기본 쿼리 빌더: termId에 해당하는 퀴즈들
        const qb = repo.createQueryBuilder("quiz").where("quiz.termId = :termId", { termId });

        // 요청된 타입이 있으면 정규화된 검색 키 목록을 사용해 필터를 추가
        if (requestedTypes && requestedTypes.length > 0) {
            const normalized = normalizeRequestedTypes(requestedTypes);
            // 헬퍼: 정규화된 검색 키들을 이용해 WHERE 절(OR 묶음)을 추가하고 파라미터를 설정
            function addTypeFilters(builder: ReturnType<typeof repo.createQueryBuilder>, types: string[]) {
                if (!types || types.length === 0) return;
                const orParts = types.map((_, i) => `LOWER(quiz.type) LIKE :type${i}`).join(' OR ');
                builder.andWhere(`(${orParts})`);
                types.forEach((key, i) => {
                    builder.setParameter(`type${i}`, `%${key}%`);
                });
            }
            addTypeFilters(qb, normalized);
        }

        const quizzes = await qb.getMany();

        const counts: Record<'mc' | 'ox' | 'short' | 'fill_blank', number> = { mc: 0, ox: 0, short: 0, fill_blank: 0 };

        // 각 퀴즈의 타입을 매핑하여 카운트
        for (const q of quizzes) {
            const qt = q && typeof (q as QuizEntity).type === 'string' ? (q as QuizEntity).type : undefined;
            const k = mapType(qt) as ('mc' | 'ox' | 'short' | 'fill_blank' | undefined);
            if (k) counts[k]++;
        }

        return NextResponse.json({ success: true, totalCount: quizzes.length, counts });
    } catch (error) {
        console.error('퀴즈 통계 조회 중 오류:', error);
        return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
