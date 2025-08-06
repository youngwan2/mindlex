import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavorite, deleteFavorite } from "./fetcher";
import { showErrorToast, showSuccessToast } from "@/shared/components/CustomToast";



/**
 * 북마크 생성 Mutation Hook
 * 이 훅은 북마크를 생성하는 기능을 제공합니다.
 * 
 * @returns useMutation 훅을 반환하며, mutate 함수를 통해 북마크를 생성할 수 있습니다.
 */
export function useCreateFavoriteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'], exact: false });
            showSuccessToast();
        },
        onError: (error) => {
            showErrorToast(error instanceof Error ? error.message : undefined);
        }

    })
}

/**
 * 북마크 삭제 Mutation Hook
 * 
 * @description 북마크 삭제 후 favorites 쿼리를 무효화하여 최신 상태로 유지합니다.
 */
export function useDeleteFavoriteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'], exact: false });
            showSuccessToast('북마크가 삭제되었습니다.');
        },
        onError: (error) => {
            showErrorToast(error instanceof Error ? error.message : '북마크 삭제 중 오류가 발생했습니다.');
        }
    });
}