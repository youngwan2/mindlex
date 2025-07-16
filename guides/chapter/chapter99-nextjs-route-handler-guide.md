# Next.js Route Handler 실전 가이드 (API, 쿠키, 헤더, 리다이렉트 등)

이 문서는 Next.js app router 환경에서 route handler(예: app/api/route.ts)로 API를 만들 때 자주 쓰는 기능별 실전 예제와 설명을 정리합니다.

---

## 1. 쿠키 읽기/설정/삭제

```ts
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const a = cookieStore.get('a');
  cookieStore.set('b', '1');
  cookieStore.delete('c');
}
```

- 또는 Response의 Set-Cookie 헤더로 직접 반환 가능

```ts
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  });
}
```

- NextRequest로도 request.cookies.get('token') 사용 가능

---

## 2. 헤더 읽기/설정

```ts
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const referer = headersList.get('referer');
}
```

- Response의 headers로 직접 반환 가능

```ts
export async function GET(request: Request) {
  const headersList = await headers();
  const referer = headersList.get('referer');
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  });
}
```

- NextRequest로도 new Headers(request.headers) 사용 가능

---

## 3. 쿼리 파라미터

```ts
import { type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
}
```

---

## 4. 동적 라우트 파라미터

```ts
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

---

## 5. Request Body (json, formData)

```ts
export async function POST(request: Request) {
  const res = await request.json();
  // 또는
  const formData = await request.formData();
  const name = formData.get('name');
}
```

---

## 6. 리다이렉트

```ts
import { redirect } from 'next/navigation';
export async function GET(request: Request) {
  redirect('https://nextjs.org/');
}
```

---

## 7. 헤더/쿠키/CORS 등 직접 설정

```ts
export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

---

## 8. 캐시/재검증 옵션

```ts
export const revalidate = 60; // 60초마다 재검증
```

---

## 9. 스트리밍/대용량 응답

```ts
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) controller.close();
      else controller.enqueue(value);
    },
  });
}

async function* makeIterator() {
  yield encoder.encode('<p>One</p>');
  await sleep(200);
  yield encoder.encode('<p>Two</p>');
}

export async function GET() {
  const iterator = makeIterator();
  const stream = iteratorToStream(iterator);
  return new Response(stream);
}
```

---

## 10. Webhook, Non-UI 응답, Segment Config 등

- Webhook: request.text()로 payload 처리
- Non-UI: Response로 xml, txt 등 반환
- Segment Config: dynamic, revalidate, runtime 등 export

---

실무에서 자주 쓰는 패턴/코드는 이 문서 참고 후 복붙/응용하면 됩니다.
