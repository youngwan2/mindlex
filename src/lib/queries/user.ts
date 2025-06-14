// 유저 관련 서버 데이터 패칭 예시 (React Query)
import { useQuery } from '@tanstack/react-query';

export function useUserQuery(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            // 실제 API 호출 예시
            const res = await fetch(`/api/user/${userId}`);
            if (!res.ok) throw new Error('User fetch failed');
            return res.json();
        },
    });
}
