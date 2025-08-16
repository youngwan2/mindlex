import QuizPlayer from "@/components/term/QuizPlayer";

export default async function QuizStartPage({ params, searchParams }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id } = await params;

    // searchParams는 Promise일 수 있으므로 await로 안전하게 처리
    const sp = await searchParams;

    // 쿼리 파라미터에서 초기값을 추출합니다.
    const types = typeof sp.types === 'string' ? sp.types : Array.isArray(sp.types) ? sp.types.join(',') : '';
    const limit = typeof sp.limit === 'string' ? Number(sp.limit) : 10;
    const shuffle = typeof sp.shuffle === 'string' ? sp.shuffle === 'true' : false;

    return (
        <div className="space-y-4 min-h-screen max-w-[1400px] mx-auto px-4 py-8 w-full">
            <h2 className="text-2xl font-semibold">퀴즈 시작</h2>
            <p className="text-sm text-gray-600">앞서 설정한 옵션에 따라 퀴즈를 불러옵니다.</p>

            {/* 클라이언트 컴포넌트인 QuizPlayer에 초기 파라미터 전달 */}
            <QuizPlayer termId={id} initialTypes={types} initialLimit={isNaN(limit) ? 10 : limit} initialShuffle={shuffle} />
        </div>
    );
}
