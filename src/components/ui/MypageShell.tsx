import React from "react";
import Link from "next/link";
import { Session } from "next-auth";

interface MypageShellProps {
    children: React.ReactNode;
    session: Session | null
};

export default function MypageShell({ children, session }: MypageShellProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <aside className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                            <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{session ? session.user?.name : '게스트'} </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">가입일: -</div>
                            </div>
                        </div>

                        <nav className="mt-6 flex flex-col gap-1">
                            <Link href="/mypage" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">프로필</Link>
                            <Link href="/mypage/favorites" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">즐겨찾기</Link>
                            <Link href="/mypage/activity" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">최근 활동</Link>
                            <Link href="/mypage/terms" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">나의 기여</Link>
                            <Link href="/mypage/settings" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">설정</Link>
                        </nav>
                    </div>
                </aside>

                <main className="md:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
