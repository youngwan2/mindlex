# Chapter 3: zod와의 통합 및 스키마 기반 검증

## 1. @hookform/resolvers/zod 설치 및 사용

```bash
npm install zod @hookform/resolvers
```

## 2. zod 스키마 작성 및 연결

```tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});
```

## 3. 타입 안전성과 에러 메시지

- zod의 타입 추론 활용
- 에러 메시지 커스터마이징

---

> 다음 장에서는 useFieldArray를 활용한 동적 필드/배열 관리 방법을 다룹니다.
