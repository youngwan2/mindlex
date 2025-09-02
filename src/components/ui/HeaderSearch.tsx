"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
    const [q, setQ] = useState('');
    const router = useRouter();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const query = q.trim();
        // 항상 /terms로 이동하고 검색어가 있으면 쿼리 파라미터로 전달
        if (query) router.push(`/terms?search=${encodeURIComponent(query)}`);
        else router.push('/terms');
    }

    return (
        <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2 w-full max-w-xs md:order-none order-3 md:mt-0 mt-2">
            <Input
                name="search"
                type="search"
                placeholder="용어 입력 후 엔터"
                className="rounded-md dark:bg-gray-800 dark:text-gray-100 w-full"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="용어 검색"
            />
            <Button type="submit" size="icon" variant="ghost" aria-label="검색">
                <Search className="w-5 h-5" />
            </Button>
        </form>
    );
}
