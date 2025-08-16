import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { QuizEntity, QuizOptionEntity } from "@/entities/quiz/quizes";
import { TermEntity } from "@/entities/term/Term";
import { In } from "typeorm";

/**
 * GET /api/(quiz)/quizes
 *
 * 프론트에서 categoryId 대신 termId로 호출하는 경우를 지원하도록 확장했습니다.
 * 또한 types, limit, shuffle 쿼리를 지원합니다.
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // 쿼리 파라미터 파싱
    const categoryIds = searchParams.get("categoryId")?.split(",").map(id => Number(id)).filter(Boolean) || [];
    const termIds = searchParams.get("termId")?.split(",").map(id => Number(id)).filter(Boolean) || [];
    const types = searchParams.get("types")?.split(",").map(t => t.trim()).filter(Boolean) || [];

    // 수신된 types 정규화: 공백/하이픈 → 언더스코어, 소문자화, 흔한 별칭 매핑
    const normalizeType = (raw: string) => {
        const s = raw.trim().toLowerCase().replace(/\s+/g, '_').replace(/-+/g, '_');
        // 별칭 매핑 (필요시 확장)
        const aliasMap: Record<string, string> = {
            'short': 'short_answer',
            'short-answer': 'short_answer',
            'short_answer': 'short_answer'
        };
        return aliasMap[s] || s;
    };

    const normalizedTypes = types.map(normalizeType);
    if (normalizedTypes.length > 0) {
        // 디버그: 파싱된 원본과 정규화 결과 로깅
        console.debug('quizzes route - types raw:', types, 'normalized:', normalizedTypes);
    }

    const limit = Number(searchParams.get("limit") || 100);
    const shuffle = searchParams.get("shuffle") === "true";

    if (categoryIds.length === 0 && termIds.length === 0) {
        return NextResponse.json({ success: false, message: "categoryId 또는 termId가 필요합니다." }, { status: 400 });
    }

    const ds = await getDataSource();
    const quizRepo = ds.getRepository(QuizEntity);
    const termRepo = ds.getRepository(TermEntity);

    // 카테고리 기반 또는 termId 기반으로 용어 가져오기
    let terms = [] as TermEntity[];
    if (categoryIds.length > 0) {
        terms = await termRepo.find({
            select: ['id', 'termKo', 'termEn', 'termHanja'],
            where: {
                categoryId: In(categoryIds)
            }
        });

        if (terms.length === 0) {
            return NextResponse.json({ success: false, message: "해당 카테고리에 속하는 용어가 없습니다." }, { status: 404 });
        }
    } else if (termIds.length > 0) {
        terms = await termRepo.find({
            select: ['id', 'termKo', 'termEn', 'termHanja'],
            where: {
                id: In(termIds)
            }
        });

        if (terms.length === 0) {
            return NextResponse.json({ success: false, message: "해당 termId에 해당하는 용어가 없습니다." }, { status: 404 });
        }
    }

    const termIdList = terms.map(term => term.id);

    // 퀴즈를 가져오기 위한 쿼리 빌드
    // 옵션은 별도 조회하므로 여기서는 quiz 테이블만 조회하도록 조인 제거
    const query = quizRepo.createQueryBuilder("quiz")
        .where("quiz.termId IN (:...termIds)", { termIds: termIdList });

    if (types.length > 0) {
        // 쿼리에는 정규화된 타입을 사용
        query.andWhere("quiz.type IN (:...types)", { types: normalizedTypes });
    }

    // 셔플 지원: DB 드라이버에 따라 함수명 선택
    try {
        // DataSource.options의 타입을 any로 처리하지 않도록 안전하게 캐스트
        const driver = ((ds.options as unknown) as { type?: string }).type;
        const randFunc = driver === 'mysql' || driver === 'mariadb' ? 'RAND()' : 'RANDOM()';
        if (shuffle) {
            // TypeORM orderBy accepts raw SQL here
            query.orderBy(randFunc);
        }

        query.limit(limit || 100);

        // 쿼리 실행 및 퀴즈와 총 개수 가져오기
        const [quizzes, totalCount] = await query.getManyAndCount();

        // 옵션 가져오기
        const quizIds = quizzes.map(quiz => quiz.id);
        const options = await quizRepo.manager.find(QuizOptionEntity, {
            where: { quizId: In(quizIds) },
            select: ['id', 'quizId', 'optionText', 'isCorrect', 'explanation']
        });

        return NextResponse.json({
            success: true,
            quizzes: quizzes.map(quiz => ({
                id: quiz.id,
                question: quiz.question,
                type: quiz.type,
                termId: quiz.termId,
                termKo: terms.find(term => term.id === quiz.termId)?.termKo || "알 수 없음",
                termEn: terms.find(term => term.id === quiz.termId)?.termEn || "알 수 없음",
                options: options.filter(option => option.quizId === quiz.id)
            })),
            totalCount: totalCount,
            message: "퀴즈 목록을 성공적으로 가져왔습니다."
        });
    } catch (error) {
        console.error("퀴즈를 가져오는 중 오류 발생:", error);
        return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
    }
}


// export async function POST(req: NextRequest) {
//     const { quizId, optionId } = await req.json();
//
//     if (!quizId || !optionId) {
//         return NextResponse.json({ success: false, message: "quizId와 optionId는 필수입니다." }, { status: 400 });
//     }
//
//     const ds = await getDataSource();
//     const optionRepo = ds.getRepository(QuizOptionEntity);
//
//     try {
//         const option = await optionRepo.findOneBy({ id: optionId, quizId });
//
//         if (!option) {
//             return NextResponse.json({ success: false, message: "해당 옵션을 찾을 수 없습니다." }, { status: 404 });
//         }
//
//         return NextResponse.json({
//             success: true,
//             isCorrect: option.isCorrect,
//             explanation: option.explanation || "해설이 제공되지 않았습니다.",
//         });
//     } catch (error) {
//         console.error("옵션을 가져오는 중 오류 발생:", error);
//         return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
//     }
// }