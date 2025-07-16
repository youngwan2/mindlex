import { TermCategoryEntity } from "@/entities/category/categories";
import { getDataSource } from "@/lib/database";
import { categoriesMock } from "@/mocks/data/categories.mock";
import { NextResponse } from "next/server";



export async function POST() {

    const ds = await getDataSource();

    // const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');

    // const ipAddress = ip ? ip.split(',')[0].trim() : 'unknown';

    const termCategoryRepo = ds.getRepository(TermCategoryEntity);


    const initData = termCategoryRepo.insert(categoriesMock);

    return NextResponse.json(initData)
}