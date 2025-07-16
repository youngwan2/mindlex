import Link from "next/link";
import { signOut } from "@/auth";
import { LogOutIcon, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface LoginLogoutButtonProps {
    isLogin: boolean;
}

export default function LoginLogoutButton({ isLogin }: LoginLogoutButtonProps) {
    if (!isLogin) {
        return (
            <Link
                href={"/login"}
                className="transition border rounded-md ml-2 dark:hover:bg-slate-700 px-1.5 py-1 dark:bg-slate-800  dark:text-gray-100 flex items-center"
            >
                <User className="w-4 h-4 inline mr-1" />
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
                    <LogOutIcon className="w-9 h-9 p-2 rounded-md ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>로그아웃</p>
                </TooltipContent>
            </Tooltip>
        </form>
    );
}
