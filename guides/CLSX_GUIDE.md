# clsx 사용법 가이드

`clsx`는 조건부로 CSS 클래스명을 손쉽게 합쳐주는 경량 유틸리티 라이브러리입니다. React, Next.js, Tailwind CSS 등에서 동적 스타일링에 매우 자주 사용됩니다.

---

## 1. 설치 방법

```bash
npm install clsx
# 또는
yarn add clsx
```

---

## 2. 기본 사용법

```typescript
import clsx from "clsx";

const isActive = true;
const isDisabled = false;

const className = clsx(
  "btn",
  isActive && "btn-active",
  isDisabled ? "btn-disabled" : null,
  ["rounded", false && "hidden"]
);
// 결과: "btn btn-active rounded"
```

- 문자열, 배열, 객체, 조건식 등 다양한 형태를 인자로 받을 수 있습니다.
- falsy 값(`false`, `null`, `undefined`, `0`, `''`)은 무시됩니다.

---

## 3. 객체 형태 사용

```typescript
const className = clsx({
  "btn": true,
  "btn-active": isActive,
  "btn-disabled": isDisabled,
});
// 결과: "btn btn-active"
```

---

## 4. 배열/중첩 조합

```typescript
const className = clsx([
  "btn",
  [isActive && "btn-active", isDisabled && "btn-disabled"]
]);
// 결과: "btn btn-active"
```

---

## 5. Tailwind CSS와 함께 사용

Tailwind CSS의 유틸리티 클래스를 조건부로 조합할 때 매우 유용합니다.

```typescript
const className = clsx(
  "p-4",
  isError ? "bg-red-100 text-red-700" : "bg-white text-black"
);
```

---

## 6. tailwind-merge와 함께 사용 (권장 패턴)

`tailwind-merge`와 함께 사용하면 중복된 Tailwind 클래스를 자동으로 병합해줍니다.

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 사용 예시
const className = cn(
  "p-2 bg-blue-500",
  isActive && "bg-green-500"
); // 결과: "p-2 bg-green-500"
```

---

## 7. 참고
- 공식 문서: [https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)
- falsy 값은 무시되므로 조건부 클래스 조합에 최적화되어 있습니다.

---

> Mindlex 프로젝트에서는 `src/lib/utils.ts`의 `cn` 함수로 tailwind-merge와 함께 사용하고 있습니다.
