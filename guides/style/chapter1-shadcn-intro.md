# 1장: shadcn/ui 입문 - 설치와 기본 사용법

## 1.1. shadcn/ui란?

- Radix UI 기반의 컴포넌트에 Tailwind CSS 스타일을 입힌 오픈소스 UI 라이브러리
- Next.js, Vite 등 다양한 환경에서 사용 가능

## 1.2. 설치 및 초기 설정

```bash
npx shadcn-ui@latest init
```

- 프롬프트에 따라 Tailwind, 폴더 구조, 컴포넌트 경로 등 설정
- 필요한 컴포넌트 추가:
  ```bash
  npx shadcn-ui@latest add button
  npx shadcn-ui@latest add dialog
  ```

## 1.3. 기본 사용 예시

```tsx
import { Button } from '@/components/ui/button';

export default function Home() {
  return <Button>샘플 버튼</Button>;
}
```

---

shadcn/ui의 기본 설치와 컴포넌트 사용법을 익힙니다.
