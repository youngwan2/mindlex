import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import LoginLogoutButton from "@/components/ui/LoginLogoutButton";
import Link from "next/link";

export default function ProfileSummary({ session }: { session: Session | null }) {
    const isLoggedIn = !!session;

    if (!isLoggedIn) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="text-lg font-medium">게스트</div>
                        <div className="text-sm text-gray-500">로그인이 필요합니다</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="default"><Link href="/login">로그인 / 회원가입</Link></Button>
                </div>
            </div>
        );
    }

    // logged in view (skeleton)
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="/avatars/default.png" alt="avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-lg font-medium">{session.user?.name || '닉네임 없음'}</div>
                    <div className="text-sm text-gray-500">{session.user?.email || '없음'}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <div className="text-sm text-gray-500">가입일</div>
                    <div className="font-medium">2025-01-01</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <div className="text-sm text-gray-500">나의 기여</div>
                    <div className="font-medium">0개</div>
                </div>
            </div>

            <LoginLogoutButton isLogin={isLoggedIn} />
        </div>
    );
}
