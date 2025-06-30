# 4장: shadcn/ui 아이콘 컴포넌트 활용법

## 4.1. 아이콘 컴포넌트란?

- shadcn/ui는 별도의 아이콘 컴포넌트는 제공하지 않지만, 공식적으로 [lucide-react](https://lucide.dev/) 아이콘 라이브러리와의 연동을 권장합니다.
- lucide-react는 다양한 SVG 아이콘을 React 컴포넌트로 제공합니다.

## 4.2. 설치 방법

```bash
npm install lucide-react
```

## 4.3. 사용 예시

```tsx
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

export default function Example() {
  return (
    <Button>
      <Search className="w-4 h-4 mr-2" />
      검색
    </Button>
  );
}
```

## 4.4. 아이콘 커스터마이징

- Tailwind CSS로 크기, 색상, 애니메이션 등 자유롭게 스타일링 가능
- 예시:
  ```tsx
  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
  ```

## 4.5. 실전 팁

- 아이콘을 Button, Input, Alert 등 다양한 shadcn/ui 컴포넌트와 조합해 사용
- 필요한 아이콘만 import하여 번들 크기 최소화
- [lucide.dev](https://lucide.dev/)에서 원하는 아이콘 이름을 검색해 import

---

아이콘 컴포넌트는 shadcn/ui와 lucide-react 조합으로 실무에서 널리 사용됩니다.
