import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavorite } from "./fetcher";
import { showErrorToast, showSuccessToast } from "@/shared/components/CustomToast";


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