# 2장: shadcn/ui 중급 - 커스텀 스타일과 테마

## 2.1. Tailwind로 커스텀 스타일 적용

- 컴포넌트에 Tailwind 클래스 추가로 자유롭게 스타일 확장
- 예시:
  ```tsx
  <Button className="bg-green-500 hover:bg-green-600">커스텀 버튼</Button>
  ```

## 2.2. 테마(Theme) 커스터마이징

- tailwind.config.js에서 색상, 폰트 등 테마 확장
- 예시:
  ```js
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        colors: {
          brand: '#123456',
        },
      },
    },
  };
  ```
- 컴포넌트에서 사용:
  ```tsx
  <Button className="bg-brand text-white">브랜드 버튼</Button>
  ```

## 2.3. 컴포넌트 오버라이드 및 slot 활용

- shadcn/ui 컴포넌트는 props, slot, className 등으로 세밀하게 커스터마이징 가능

---

실무에서 자주 쓰는 커스텀 스타일, 테마 확장, 오버라이드 방법을 익힙니다.
