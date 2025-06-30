# 3장: shadcn/ui 고급 - 실전 활용과 확장

## 3.1. 컴포넌트 확장 및 재사용

shadcn/ui의 컴포넌트는 props, className, slot 등을 활용해 자유롭게 확장할 수 있습니다.

### 3.1.1. 래핑(Wrapper) 컴포넌트 만들기

- 기존 컴포넌트에 공통 스타일, 아이콘, 로딩 등 부가기능을 추가할 때 유용합니다.
- 예시:
  ```tsx
  import { Button, ButtonProps } from '@/components/ui/button';
  import { Loader2 } from 'lucide-react';
  export function IconButton({
    icon,
    loading,
    children,
    ...props
  }: ButtonProps & { icon?: React.ReactNode; loading?: boolean }) {
    return (
      <Button
        {...props}
        className={'flex items-center gap-2 ' + (props.className ?? '')}
        disabled={loading || props.disabled}
      >
        {loading ? <Loader2 className="animate-spin" /> : icon}
        {children}
      </Button>
    );
  }
  ```

### 3.1.2. props, slot, asChild 활용

- shadcn/ui 컴포넌트는 asChild, slot 등으로 내부 구조를 커스터마이즈할 수 있습니다.
- 예시:
  ```tsx
  <Button asChild>
    <a href="/docs">문서 바로가기</a>
  </Button>
  ```

---

## 3.2. 다크모드, 접근성(a11y), 애니메이션

### 3.2.1. 다크모드 지원

- Tailwind의 dark: 접두사와 shadcn/ui 조합으로 손쉽게 다크모드 스타일 적용
- 예시:
  ```tsx
  <Button className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-200">
    다크모드 버튼
  </Button>
  ```
- Next.js에서는 `next-themes` 패키지로 테마 전환 상태 관리 가능

### 3.2.2. 접근성(a11y)

- Radix UI 기반이므로 키보드 내비게이션, 스크린리더 등 접근성이 기본 보장
- 추가적으로 aria-\* 속성, focus-visible 등으로 세밀한 접근성 강화 가능
- 예시:
  ```tsx
  <Button aria-label="저장">Save</Button>
  ```

### 3.2.3. 애니메이션/트랜지션

- Tailwind의 transition, animate 유틸리티로 자연스러운 효과 구현
- 예시:
  ```tsx
  <Button className="transition-transform duration-200 hover:scale-105">애니메이션 버튼</Button>
  ```
- Dialog, Drawer 등 shadcn/ui 컴포넌트는 기본적으로 트랜지션이 내장되어 있음

---

## 3.3. 실전 패턴: 디자인 시스템 구축

### 3.3.1. 공통 UI 패턴 설계

- Button, Input, Modal, Alert 등 공통 UI를 shadcn/ui로 통일성 있게 구현
- 예시:
  ```tsx
  // components/ui/alert.tsx
  import { Alert as RadixAlert, AlertProps } from '@radix-ui/react-alert-dialog';
  export function Alert(props: AlertProps) {
    return <RadixAlert {...props} className="rounded bg-red-100 p-4 text-red-800" />;
  }
  ```

### 3.3.2. 커스텀 훅/컨텍스트와 조합

- UI 상태(모달 열기/닫기, 토스트 등)를 커스텀 훅/컨텍스트로 관리
- 예시:
  ```tsx
  // hooks/useModal.ts
  import { useState } from 'react';
  export function useModal() {
    const [open, setOpen] = useState(false);
    return { open, openModal: () => setOpen(true), closeModal: () => setOpen(false) };
  }
  ```

### 3.3.3. 디자인 시스템 적용 팁

- tailwind.config.js에서 색상, 폰트, spacing 등 테마를 일관되게 관리
- Storybook 등으로 컴포넌트 카탈로그화
- shadcn/ui 공식 문서와 커뮤니티 예제 참고

---

shadcn/ui를 활용한 고급 커스터마이징, 디자인 시스템 구축, 실전 패턴을 익힙니다.
