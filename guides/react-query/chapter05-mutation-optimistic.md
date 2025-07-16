# 5장: Optimistic Update와 뮤테이션 실전 패턴

## Optimistic Update란?

- 서버 응답 전, UI를 미리 업데이트하여 즉각적 UX 제공
- 실패 시 롤백 처리

## useMutation + onMutate/onError/onSettled

```tsx
const mutation = useMutation({
  mutationFn: updateTerm,
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['terms'] });
    const previous = queryClient.getQueryData(['terms']);
    queryClient.setQueryData(['terms'], (old) => ...optimisticUpdate...);
    return { previous };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(['terms'], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['terms'] });
  },
});
```

## 실무 팁

- 낙관적 업데이트는 UX/성능 모두 개선
- 롤백/에러 핸들링 필수

---

**다음 장 예고:**
6장에서는 React Query Devtools 활용법과 실전 디버깅 팁을 다룹니다.
