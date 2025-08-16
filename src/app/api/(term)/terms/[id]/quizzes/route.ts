import { QuizEntity, QuizOptionEntity } from "@/entities/quiz/quizes";
import { getDataSource } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { In } from "typeorm";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    // id 가 유효한 숫자인지 확인
    if (typeof Number(id) !== 'number' || isNaN(Number(id))) {
        return NextResponse.json({ success: false, message: "유효하지 않은 ID입니다." }, { status: 400 });
    }

    const ds = await getDataSource();

    // 1. 용어 id 로 퀴즈  리스트 조회
    const quizRepo = ds.getRepository(QuizEntity)

    const [quizzes, totalCount] = await quizRepo.findAndCount({
        where: { termId: Number(id) }
    })

    // 퀴즈가 없으면 404 에러
    if (quizzes.length === 0) {
        return NextResponse.json({ success: false, message: "해당 용어에 대한 퀴즈가 없습니다." }, { status: 404 });
    }

    // 퀴즈 ID 목록 추출
    const quizIds = quizzes.map((q) => q.id);

    // 2. 퀴즈 옵션 조회
    const options = await ds.getRepository(QuizOptionEntity).findBy({
        quizId: In(quizIds)
    })

    const items = quizzes.map(quiz => ({
        ...quiz,
        options: options.filter(option => option.quizId === quiz.id)
    }))


    // 3. 퀴즈 및 옵션을 포함한 응답 반환
    return NextResponse.json({
        success: true, items, totalCount, message: "퀴즈 조회 성공"
    }, { status: 200 });

}