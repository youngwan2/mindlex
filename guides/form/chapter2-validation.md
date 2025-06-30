# Chapter 2: 내장 유효성 검증 옵션 활용

## 1. 필수값, 길이, 패턴 등 기본 옵션

```tsx
<input
  {...register('email', {
    required: '이메일 필수',
    pattern: { value: /@/, message: '이메일 형식' },
  })}
/>;
{
  errors.email && <span>{errors.email.message}</span>;
}
```

## 2. 여러 필드 유효성 예제

```tsx
<input
  {...register('password', { required: true, minLength: { value: 8, message: '8자 이상' } })}
/>;
{
  errors.password && <span>{errors.password.message}</span>;
}
```

## 3. 실전 팁

- 에러 메시지 커스터마이징
- 조건부 유효성 등

---

> 다음 장에서는 zod와 통합하여 스키마 기반 검증을 다룹니다.
