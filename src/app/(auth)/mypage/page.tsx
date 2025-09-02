import React from "react";
import MypageShell from "@/components/ui/MypageShell";
import ProfileSummary from "@/features/user/components/ProfileSummary";
import { auth } from "@/auth";

export default async function MyPage() {

    const session = await auth();



    return (
        <MypageShell session={session}>
            <h1 className="text-2xl font-semibold mb-4">내 정보</h1>
            <ProfileSummary session={session} />
        </MypageShell>
    );
}
