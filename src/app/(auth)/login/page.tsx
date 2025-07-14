import { signIn } from "@/auth";
import { auth } from "@/auth"
import { BookOpen } from "lucide-react";
import { SiGoogle, SiNaver } from "react-icons/si";
import Link from "next/link";

export default async function LoginPage() {

    const session = await auth()

    if (session) return <div className="max-w-[440px] w-full p-6 border rounded-md mx-auto mt-12 bg-primary-foreground flex flex-col justify-center ">
        <h2 className="font-semibold text-primary text-xl mb-3 text-center">안녕하세요! {session.user?.name}님!</h2>
        <p className="mb-3">이미 로그인되어 있습니다. 다른 페이지로 이동해주세요.</p>
        <Link href={"/"} className="bg-slate-700 text-white px-1.5 py-1 rounded-sm text-center">홈으로 이동</Link>
    </div>
    if (!session)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 dark:bg-gray-900">
                <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <BookOpen className="w-10 h-10 text-primary mb-1" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">소셜 로그인/회원가입</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">마인드렉스는 소셜 계정으로만 로그인/회원가입 할 수 있습니다. 최초 로그인 시도 시 자동으로 회원가입이 진행됩니다.</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        <form
                            className="flex items-center gap-2 justify-center border p-3 hover:bg-gray-100 cursor-pointer"
                            action={async () => {
                                "use server"
                                await signIn("google", { redirectTo: "/" })
                            }}
                        >
                            <SiGoogle className="w-5 h-5 text-black" />
                            <button type="submit">구글 계정으로 로그인</button>
                        </form>
                        {/* <Button
                        variant="outline"
                        className="flex items-center gap-2 justify-center w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                        onClick={() => window.location.href = "/api/auth/kakao"}
                    >
                        <SiKakaotalk className="w-5 h-5 text-[#FEE500]" />
                        <span>카카오 계정으로 로그인</span>
                    </Button>
                     */}
                        <form
                            className="flex items-center gap-2 justify-center border p-3 hover:bg-gray-100 cursor-pointer"
                            action={async () => {
                                "use server"
                                await signIn("naver", { redirectTo: "/" })
                            }}
                        >
                            <SiNaver className="w-5 h-5 text-[#03C75A]" />
                            <button type="submit">네이버 계정으로 로그인</button>
                        </form>

                    </div>
                </div>
            </div>
        );
}