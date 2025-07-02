# Next.js 13+ App Router에서 Inter + Noto Sans KR 폰트 적용 가이드

## 1장: 폰트 선택 및 특징

- **Inter**: 영문에 최적화된 현대적 산세리프 폰트, 가독성 우수, 구글 공식 지원
- **Noto Sans KR**: 한글에 최적화, 다양한 굵기, 깔끔하고 현대적
- 두 폰트 조합 시 한글·영문 모두 자연스럽고, 퀴즈/교육/정보성 사이트에 적합

---

## 2장: 폰트 패키지 설치 및 CDN 적용

### 2.1. next/font/google 사용 (권장)

```bash
npm install next@latest
```

---

## 3장: next/font/google로 글로벌 폰트 적용

### 3.1. `src/app/layout.tsx`에서 폰트 임포트 및 설정

```tsx
import { Inter, Noto_Sans_KR } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4장: 글로벌 CSS에서 폰트 패밀리 지정

### 4.1. `src/app/globals.css`에 아래 코드 추가

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-noto: 'Noto Sans KR', sans-serif;
}

body {
  font-family: var(--font-inter), var(--font-noto), 'Apple SD Gothic Neo', 'Malgun Gothic',
    'Segoe UI', Arial, sans-serif;
}
```

- Inter → Noto Sans KR → 시스템 한글 폰트 순으로 fallback

---

## 5장: 폰트 적용 확인 및 커스텀

- 특정 컴포넌트에만 한글/영문 폰트 강조 시:

```css
.korean {
  font-family: var(--font-noto), sans-serif;
}
.english {
  font-family: var(--font-inter), sans-serif;
}
```

---

## 6장: CDN 방식(대안)

- `public/index.html` 또는 `_document.tsx`에 아래 코드 추가

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

- CSS에서 `font-family` 지정은 위와 동일

---

## 7장: 참고 및 팁

- next/font 사용 시 폰트가 자동으로 최적화되어 성능이 좋음
- 글로벌 스타일, Tailwind, shadcn/ui 등과도 충돌 없이 사용 가능
- 다양한 굵기(weight) 지정 가능: 필요에 따라 ['300', '400', '500', '700'] 등 추가

---

## 8장: next/font의 폰트 최적화 원리와 장점

- **자동 서브셋팅**: 사용된 문자만 포함된 폰트 파일을 생성해 불필요한 용량을 줄임
- **자동 preload**: 폰트 파일을 `<link rel="preload">`로 미리 불러와 렌더링 지연(FOUT) 최소화
- **CSS-in-JS 통합**: 폰트 선언이 CSS-in-JS로 관리되어, 불필요한 글로벌 CSS/네트워크 요청 감소
- **캐싱 및 중복 제거**: 동일 폰트 여러 번 import해도 중복 요청 없이 한 번만 로드
- **빌드 시점 최적화**: 서버에서 폰트 파일을 직접 호스팅, 외부 CDN 의존도↓, 속도↑, 개인정보 보호↑
- **자동 폴백 관리**: 시스템 폰트와의 폴백이 자동으로 적용되어 다양한 환경에서 일관된 렌더링
- **LCP(최대 콘텐츠 페인트) 개선**: 폰트 로딩이 빨라져 Core Web Vitals 점수 향상

> next/font는 Next.js 13+에서 폰트 성능, 접근성, SEO, 사용자 경험을 모두 향상시키는 최신 폰트 관리 방식입니다.

---

> 이 가이드는 Next.js 13 이상 App Router 환경에서 Inter + Noto Sans KR 폰트 조합을 가장 현대적이고 성능 좋게 적용하는 방법을 단계별로 안내합니다.
