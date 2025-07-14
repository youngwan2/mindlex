"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function MobileSearch() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="검색"
                className="flex md:hidden"
                onClick={() => setSearchOpen(true)}
            >
                <Search className="w-5 h-5" />
            </Button>
            {searchOpen && (
                createPortal(
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">용어 검색</span>
                                <Button size="icon" variant="ghost" aria-label="닫기" onClick={() => setSearchOpen(false)}>
                                    <span className="text-2xl">×</span>
                                </Button>
                            </div>
                            <Input autoFocus type="search" placeholder="용어 입력 후 엔터" className="rounded-md dark:bg-gray-800 dark:text-gray-100 w-full" />
                            <Button type="submit" className="w-full mt-2">검색</Button>
                        </div>
                    </div>
                    , document.body)
            )}
        </>
    );
}
