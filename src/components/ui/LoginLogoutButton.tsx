import Link from "next/link";
import { signOut } from "@/auth";
import { LogOutIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface LoginLogoutButtonProps {
    isLogin: boolean;
}

export default function LoginLogoutButton({ isLogin }: LoginLogoutButtonProps) {
    if (!isLogin) {
        return (
            <Link
                href={"/login"}
                className="text-gray-100 text-sm transition bg-primary hover:bg-slate-700 px-1.5 py-1 rounded-md dark:bg-amber-400 dark:text-gray-100"
            >
                로그인
            </Link>
        );
    }
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}
        >
            <Tooltip>
                <TooltipTrigger className="flex items-center justify-center">
                    <LogOutIcon className="w-8 h-8 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>로그아웃</p>
                </TooltipContent>
            </Tooltip>
        </form>
    );
}
