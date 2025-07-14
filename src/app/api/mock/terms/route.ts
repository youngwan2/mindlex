import { TermEntity } from "@/entities/term/Term";
import { getDataSource } from "@/lib/database";
import { termsMock } from "@/mocks/data/terms.mock";
import { NextResponse } from "next/server";


export async function POST() {
    const ds = await getDataSource();

    const termEntityRepo = ds.getRepository(TermEntity);

    // Mock 데이터 삽입
    const initData = await termEntityRepo.insert(termsMock);

    return NextResponse.json(initData);
}