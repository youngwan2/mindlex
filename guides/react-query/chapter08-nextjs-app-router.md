# 8장: Next.js App Router에서 React Query 공식 설정법 (v5 기준)

이 장에서는 React Query 공식문서(SSR/Streaming/Prefetch/Hydration) 기준으로 Next.js App Router 환경에서의 실무적 설정/패턴을 정리합니다.

---

## 1. 기본 Provider 구조 (app/providers.tsx)

공식 권장 패턴은 QueryClientProvider를 별도 클라이언트 컴포넌트로 분리하는 것입니다.

```tsx
// app/providers.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // SSR 시 즉시 refetch 방지
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## 2. layout.tsx에서 Provider로 감싸기

```tsx
// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {/* Header, main, Footer 등 기존 구조 */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 3. SSR/Streaming Prefetch + Hydration 공식 패턴

### (1) 서버 컴포넌트에서 prefetch & dehydrate

```tsx
// app/posts/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Posts from './posts';

export default async function PostsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
}
```

### (2) 클라이언트 컴포넌트에서 useQuery

```tsx
// app/posts/posts.tsx
'use client';
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  // ...
}
```

- 반드시 'use client' 선언 필요
- prefetch된 데이터는 HydrationBoundary로 자동 전달됨

---

## 4. 실무 팁/주의사항

- QueryClient는 SSR 환경에서 요청마다 새로 생성해야 하며, Provider는 클라이언트 컴포넌트여야 함
- prefetchQuery는 await로 병렬 처리 권장 (Promise.all)
- dehydrate로 직렬화 가능한 데이터만 반환(날짜/Map/Set 등은 변환 필요)
- HydrationBoundary는 반드시 클라이언트 컴포넌트에서만 사용
- SSR/Streaming/Prefetch 패턴은 공식문서(Advanced SSR, Hydration) 참고

---

## 참고 공식문서

- [Advanced SSR Guide](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)
- [Server Rendering & Hydration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [Next.js App Prefetching Example](https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching)

---

**다음 장 예고:**

- Suspense, Prefetch, SSR/SSG 연동 등 고급 패턴을 다룹니다.
