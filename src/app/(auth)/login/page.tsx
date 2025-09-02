import { signIn } from "@/auth";
import { auth } from "@/auth";
import { BookOpen, Home } from "lucide-react";
import { SiGoogle, SiNaver } from "react-icons/si";
import Link from "next/link";

export default async function LoginPage() {
    const session = await auth();

    if (session) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-[var(--color-brand)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8 text-[var(--color-brand)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        안녕하세요! {session.user?.name}님!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        이미 로그인되어 있습니다. 다른 페이지로 이동해주세요.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Home className="w-5 h-5" />
                        홈으로 이동
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--color-brand)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-[var(--color-brand)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        소셜 로그인/회원가입
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        마인드렉스는 소셜 계정으로만 로그인/회원가입 할 수 있습니다.
                        <br />
                        최초 로그인 시도 시 자동으로 회원가입이 진행됩니다.
                    </p>
                </div>

                <div className="space-y-4">
                    <form
                        action={async () => {
                            "use server";
                            await signIn("google", { redirectTo: "/" });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="구글 계정으로 로그인"
                        >
                            <SiGoogle className="w-5 h-5" />
                            구글 계정으로 로그인
                        </button>
                    </form>

                    <form
                        action={async () => {
                            "use server";
                            await signIn("naver", { redirectTo: "/" });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-[#03C75A] hover:bg-[#02b851] text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="네이버 계정으로 로그인"
                        >
                            <SiNaver className="w-5 h-5" />
                            네이버 계정으로 로그인
                        </button>
                    </form>

                    {/* 주석 처리된 카카오 로그인 (필요 시 활성화)
                    <form action={async () => { "use server"; await signIn("kakao", { redirectTo: "/" }); }}>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#f4dd00] text-black px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="카카오 계정으로 로그인"
                        >
                            <SiKakaotalk className="w-5 h-5" />
                            카카오 계정으로 로그인
                        </button>
                    </form>
                    */}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        로그인 시 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}