import { auth } from "@/auth";
import FavoriteContainer from "@/features/favorite/components/FavoriteContainer";
import Link from "next/link";
import { Suspense } from "react";


export default async function FavoritesPage() {

    const session = await auth();

    if (!session) {
        return (
            <div className="max-w-[440px] w-full p-6 border rounded-md mx-auto mt-12 bg-primary-foreground flex flex-col justify-center ">
                <h2 className="font-semibold text-primary text-xl mb-3 text-center">로그인이 필요해요!</h2>
                <p className="mb-3">즐겨찾기 기능을 사용하려면 로그인이 필요합니다.</p>
                <Link href={"/login"} className="bg-slate-700 text-white px-1.5 py-1 rounded-sm text-center">로그인하러 가기</Link>
            </div>
        );
    }

    return (
        <Suspense fallback={null}>
            <FavoriteContainer />
        </Suspense>

    );
}
