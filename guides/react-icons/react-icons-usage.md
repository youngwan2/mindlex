# react-icons 사용법 가이드 (구글/네이버/카카오 등 브랜드 아이콘)

## 1. 설치 방법

```bash
npm install react-icons
```

## 2. 주요 브랜드 아이콘 import 예시

react-icons의 SimpleIcons(`react-icons/si`)에서 구글, 네이버, 카카오 등 다양한 브랜드 아이콘을 바로 사용할 수 있습니다.

```tsx
import { SiGoogle, SiNaver, SiKakaotalk } from 'react-icons/si';

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      <button className="flex items-center gap-2">
        <SiGoogle className="w-5 h-5 text-[#4285F4]" />
        구글 계정으로 로그인
      </button>
      <button className="flex items-center gap-2">
        <SiKakaotalk className="w-5 h-5 text-[#FEE500]" />
        카카오 계정으로 로그인
      </button>
      <button className="flex items-center gap-2">
        <SiNaver className="w-5 h-5 text-[#03C75A]" />
        네이버 계정으로 로그인
      </button>
    </div>
  );
}
```

## 3. 컬러/사이즈 커스터마이즈

- `className` 또는 `color`, `size` prop으로 자유롭게 스타일링 가능
- 예시: `<SiGoogle color="#4285F4" size={24} />`

## 4. 공식 문서

- [react-icons 공식 사이트](https://react-icons.github.io/react-icons/)
- [SimpleIcons 브랜드 목록](https://simpleicons.org/)

---

> react-icons는 다양한 브랜드/소셜/일반 아이콘을 React 컴포넌트로 쉽게 사용할 수 있는 라이브러리입니다. 브랜드 컬러와 접근성까지 고려해 UI에 적용하세요.
