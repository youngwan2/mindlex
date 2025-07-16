import { TermEntity } from "@/entities/term/Term";
import { getDataSource } from "@/lib/database";
import { termsMock } from "@/mocks/data/terms.mock";
import { NextRequest, NextResponse } from "next/server";


export async function POST() {
    const ds = await getDataSource();

    const termEntityRepo = ds.getRepository(TermEntity);

    // Mock 데이터 삽입
    const initData = await termEntityRepo.insert(termsMock);



    return NextResponse.json(initData);
}

export async function GET(req: NextRequest) {
    const ds = await getDataSource();

    const size = Number(req.nextUrl.searchParams.get("size")) || 20; // 페이지당 항목 수
    const page = Number(req.nextUrl.searchParams.get("page")) || 1; //

    const termEntityRepo = ds.getRepository(TermEntity);

    const [data, total] = await termEntityRepo
        .createQueryBuilder('term')
        .offset(size * (page - 1))
        .limit(size)
        .orderBy('term.id', 'ASC')
        .getManyAndCount(); // 게시글 목록과 총 개수 가져오기

    return NextResponse.json({ data, total });
}