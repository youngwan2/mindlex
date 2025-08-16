import { auth } from "@/auth";
import FavoriteContainer from "@/features/favorite/components/FavoriteContainer";
import Link from "next/link";
import { Suspense } from "react";
import { FaRegStar, FaSignInAlt } from "react-icons/fa";

export default async function FavoritesPage() {

    const session = await auth();

    if (!session) {
        return (
            <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden px-6 py-12">
                {/* 배경 데코 */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
                    <div className="absolute -top-28 -left-40 w-[520px] h-[520px] rounded-full bg-amber-300/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl animate-pulse [animation-delay:400ms]" />
                </div>

                <div className="max-w-2xl w-full text-center flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 blur-2xl bg-amber-400/40 rounded-full" />
                            <FaRegStar className="relative text-amber-500 dark:text-amber-400 drop-shadow-md" size={86} />
                        </div>
                        <div className="space-y-3">
                            <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 dark:from-amber-300 dark:via-yellow-300 dark:to-orange-300">
                                즐겨찾기를 사용하려면 로그인하세요
                            </h1>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                관심있는 용어와 퀴즈를 저장하고 한 곳에서 빠르게 찾아보세요. 지금 로그인하여 나만의 학습 컬렉션을 만들어보세요.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="/login"
                            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-white font-semibold shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition disabled:opacity-60"
                        >
                            <FaSignInAlt className="h-5 w-5 transition-transform group-hover:scale-110" />
                            로그인 하러가기
                        </Link>
                        <Link
                            href="/terms"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur px-6 py-3 font-medium text-amber-700 dark:text-amber-300 hover:border-amber-500 hover:shadow-md transition"
                        >
                            먼저 용어 둘러보기
                        </Link>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        아직 계정이 없다면 로그인 페이지에서 간단히 회원가입할 수 있습니다.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={null}>
            <FavoriteContainer />
        </Suspense>

    );
}
