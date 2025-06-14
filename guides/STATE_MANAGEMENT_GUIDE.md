# React Query & Zustand 폴더 구조 및 실무 적용 가이드

## 1. 폴더 구조 권장안

```
src/
  lib/
    queries/           # 서버 상태(React Query) 관련 쿼리 훅
      user.ts          # 유저 관련 useUserQuery 등
      dictionary.ts    # 용어사전 관련 쿼리 훅
      ...
  store/               # 클라이언트 전역 상태(Zustand) 관리
    userStore.ts       # 유저 상태
    uiStore.ts         # UI 상태(모달 등)
    ...
```

## 2. React Query 쿼리 훅 예시 (src/lib/queries/user.ts)
```ts
import { useQuery } from '@tanstack/react-query';

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) throw new Error('User fetch failed');
      return res.json();
    },
  });
}
```

## 3. Zustand 전역 상태 예시 (src/store/userStore.ts)
```ts
import { create } from 'zustand';

interface UserState {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

## 4. 실제 사용 예시
```tsx
import { useUserQuery } from '@/lib/queries/user';
import { useUserStore } from '@/store/userStore';
```

## 5. 실무 팁
- 쿼리 훅과 전역 상태 훅을 도메인별로 분리해 관리하면 유지보수와 확장성이 높아집니다.
- 폴더명은 queries, store, stores, state 등 팀 컨벤션에 맞게 선택하면 됩니다.
- 커스텀 훅처럼 래핑해서 export하면 컴포넌트에서 비즈니스 로직만 신경 쓸 수 있습니다.

---

이 구조를 참고해 서버 상태(React Query)와 클라이언트 전역 상태(Zustand)를 효율적으로 관리하세요.
