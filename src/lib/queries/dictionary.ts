// 용어사전 관련 서버 데이터 패칭 예시 (React Query)
import { useQuery } from '@tanstack/react-query';

export function useDictionaryQuery() {
    return useQuery({
        queryKey: ['dictionary'],
        queryFn: async () => {
            const res = await fetch('/api/dictionary');
            if (!res.ok) throw new Error('Dictionary fetch failed');
            return res.json();
        },
    });
}
