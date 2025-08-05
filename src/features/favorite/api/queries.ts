import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "./fetcher";



export function useFavoritesQuery(type: 'term' | 'quiz', page: number, size: number) {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: () => fetchFavorites(type, page, size),
    })

    const totalCount = data.totalCount || 0;
    const favorites = data.favorites || [];

    return {
        favorites,
        totalCount,
        isLoading,
        isError
    }
}