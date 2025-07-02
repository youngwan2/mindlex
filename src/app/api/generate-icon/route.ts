import { NextRequest, NextResponse } from "next/server";
// import { promises as fs } from "fs";
// import path from "path";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    const { prompt, filename } = await req.json();

    try {
        console.log("이미지 생성 요청:", { prompt, filename });
        // const response = await client.images.generate({
        //     model: "dall-e-3",
        //     prompt,
        //     n: 1,
        //     size: "1024x1024",
        //     quality: "hd",
        //     response_format: "b64_json"
        // });

        // if (!response.data || response.data.length === 0) {
        //     return NextResponse.json({ error: "이미지 생성 실패" }, { status: 500 });
        // }

        // const image = response.data[0].b64_json;
        // if (typeof image !== "string") {
        //     throw new Error("이미지 데이터가 올바르지 않습니다.");
        // }

        // const buffer = Buffer.from(image, "base64");
        // const filePath = path.join(process.cwd(), "public", "icons", filename);
        // await fs.writeFile(filePath, buffer);

        return NextResponse.json({ success: true, filePath: `/icons/${filename}` });
    } catch (error) {
        console.error("이미지 생성 또는 저장 실패:", error);
        return NextResponse.json({ error: "이미지 생성 실패" }, { status: 500 });
    }
}
