import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import MobileSearch from "@/components/ui/MobileSearch";
import { auth } from "@/auth";
import LoginLogoutButton from "./LoginLogoutButton";

export default async function Header() {

    const session = await auth();


    const isLogin = !!session;
    return (
        <header className="w-full border-b bg-gray backdrop-blur sticky top-0 z-30 dark:bg-gray-900 dark:border-gray-800 py-2 md:py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4 md:flex-row flex-col md:h-16 h-auto gap-2 md:gap-0">
                <div className="flex w-full gap-6">
                    <Link href={"/"} className="flex items-center gap-2 w-full md:w-auto justify-between justify-start">
                        <BookOpen className="w-7 h-7 font-bold text-amber-400" />
                        <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">마인드렉스</span>
                    </Link>

                    {/* 데스크탑 전용 검색창*/}
                    <form className="hidden md:flex items-center gap-2 w-full max-w-xs md:order-none order-3 md:mt-0 mt-2">
                        <Input type="search" placeholder="용어 입력 후 엔터" className="rounded-md dark:bg-gray-800 dark:text-gray-100 w-full" />
                        <Button type="submit" size="icon" variant="ghost" aria-label="검색">
                            <Search className="w-5 h-5" />
                        </Button>
                    </form>

                    {/* 모바일 전용 검색 모달 */}
                    <MobileSearch />
                </div>
                <nav className="flex items-center gap-2 md:order-none order-2 w-full md:w-auto justify-end md:justify-end min-w-1/4">
                    <Link href="/quiz" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">퀴즈</Link>
                    <LoginLogoutButton isLogin={isLogin} />
                    <DarkModeToggle />
                </nav>
            </div>
        </header>
    );
}