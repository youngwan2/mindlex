"use client"

import { Button } from "@/components/ui/button"
import { useCreateFavoriteMutation } from "@/features/favorite/api/mutations"
import { Bookmark } from "lucide-react"

export default function FavoriteButton({ variant, targetId, type }: { variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined, targetId: number, type: 'term' | 'quiz' }) {

    const { mutate } = useCreateFavoriteMutation();

    function handleFavoriteClick() {
        mutate({ targetId, type });
    }

    return (
        <Button onClick={handleFavoriteClick} variant={variant} className={`w-full flex items-center gap-2 px-4 py-2 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition`}>
            <Bookmark className="w-5 h-5" />
            <span className="text-sm">북마크</span>
        </Button>
    )
}