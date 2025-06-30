# Chapter 1: react-hook-form 기본 사용법

## 1. useForm 훅 소개

- 폼 상태, 입력값, 에러 등을 쉽게 관리할 수 있는 핵심 훅

## 2. 기본 폼 작성 예제

```tsx
import { useForm } from 'react-hook-form';

export default function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="이름" />
      <button type="submit">제출</button>
    </form>
  );
}
```

## 3. 주요 함수 설명

- `register`: 입력 필드와 폼 상태 연결
- `handleSubmit`: 제출 이벤트 처리
- `formState.errors`: 에러 정보

## 4. 실무 장점

- 코드가 간결하고, 성능이 뛰어남

---

> 다음 장에서는 내장 유효성 검증 옵션을 활용한 폼 검증 방법을 다룹니다.
