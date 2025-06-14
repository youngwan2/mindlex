# Next.js 소셜 로그인 연동 가이드 (Auth.js 기준)

## 1. 개요
- Next.js에서 Google, Kakao, Naver, Github 등 다양한 소셜 로그인을 쉽게 연동할 수 있는 라이브러리로 **Auth.js**(next-auth v5+) 사용을 권장합니다.
- 서버/클라이언트 인증 상태 관리, JWT, DB 연동 등 확장성이 뛰어남.

---

## 2. 설치

```bash
npm install @auth/core @auth/nextjs
```

---

## 3. 기본 설정

### 1) API Route 생성 (app/api/auth/[...route]/route.ts)
```ts
import NextAuth from "@auth/nextjs";
import Google from "@auth/core/providers/google";
// import Naver from "@auth/core/providers/naver";
// import Kakao from "@auth/core/providers/kakao";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Naver({ ... }),
    // Kakao({ ... }),
  ],
  // ...추가 옵션(JWT, DB 등)
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 2) 환경 변수 (.env)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_URL=http://localhost:3000
```

### 3) 클라이언트에서 사용 예시
```tsx
'use client';
import { signIn, signOut, useSession } from "@auth/nextjs/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <span>{session.user?.name}님 환영합니다!</span>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return <button onClick={() => signIn('google')}>구글 로그인</button>;
}
```

---

## 4. 참고사항
- 카카오/네이버 등 국내 소셜 로그인도 provider import 및 clientId/secret만 추가하면 쉽게 연동 가능
- DB 연동, JWT 커스텀, 콜백 등 고급 설정은 공식 문서 참고
- 공식 문서: https://authjs.dev/

---

이 가이드를 참고해 Auth.js 기반 소셜 로그인을 빠르게 연동하세요.
