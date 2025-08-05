import { TermEntity } from "@/entities/term/Term";
import { getDataSource } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";


/**
 * 용어 상세 정보 조회
 * @param req - NextRequest 객체
 * @param params.id - 용어 ID
 * @returns 용어ID에 해당하는 용어 정보
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id: termId } = await params;
    const ds = await getDataSource();

    const termEntityRepo = ds.getRepository(TermEntity);

    const termEntity = await termEntityRepo
        .createQueryBuilder("terms")
        .innerJoinAndSelect("terms.category", "term_categories")
        .where("terms.id = :id", { id: termId })
        .getOne();

    if (!termEntity) {
        return NextResponse.json({ error: "조회된 용어 없음" }, { status: 404 });
    }

    return NextResponse.json(termEntity);

}