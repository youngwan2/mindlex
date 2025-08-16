import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { QuizEntity, QuizOptionEntity } from "@/entities/quiz/quizes";
import { mockQuizzes, mockQuizOptions } from "@/mocks/data/quizes";



export async function POST() {
    const ds = await getDataSource();
    const quizRepo = ds.getRepository(QuizEntity);
    const optionRepo = ds.getRepository(QuizOptionEntity);

    try {
        // 퀴즈 데이터 추가
        for (const quiz of mockQuizzes) {
            const existingQuiz = await quizRepo.findOneBy({ id: quiz.id });
            if (!existingQuiz) {
                await quizRepo.save(quiz);
            }
        }

        // 퀴즈 옵션 데이터 추가
        for (const option of mockQuizOptions) {
            const existingOption = await optionRepo.findOneBy({ id: option.id });
            if (!existingOption) {
                await optionRepo.save(option);
            }
        }

        return NextResponse.json({ success: true, message: "Mock data added successfully." });
    } catch (error) {
        console.error("Error adding mock data:", error);
        return NextResponse.json({ success: false, message: "Failed to add mock data." }, { status: 500 });
    }
}