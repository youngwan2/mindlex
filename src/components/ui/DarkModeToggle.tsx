"use client";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(
        typeof window !== "undefined" && document.documentElement.classList.contains("dark") // 다크모드 라면 true, 아니면 false
    );

    const toggleDark = () => {
        if (typeof window !== "undefined") {
            const html = document.documentElement;
            if (html.classList.contains("dark")) { // 현재 다크모드 라면
                html.classList.remove("dark"); // 다크모드 제거(라이트 모드로 전환)
                setDark(false);
            } else {
                html.classList.add("dark"); // 다크모드 설정
                setDark(true);
            }
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger aria-label="색상 테마 토글" onClick={toggleDark} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200 " />}
            </TooltipTrigger>
            <TooltipContent>
                <p>{dark ? '라이트 모드' : '다크 모드'}</p>
            </TooltipContent>
        </Tooltip>

    );
}
