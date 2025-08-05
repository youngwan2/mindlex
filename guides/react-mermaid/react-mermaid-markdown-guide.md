# React에서 Markdown + Mermaid.js 다이어그램 렌더링 가이드

React 환경에서 Markdown 문서 내에 mermaid 다이어그램 코드를 포함하고, 이를 자동으로 시각화하는 방법을 안내합니다.

---

## 1. 주요 라이브러리 설치

```bash
npm install react-markdown remark-gfm remark-mermaidjs mermaid --save
```

- `react-markdown`: React에서 마크다운을 렌더링하는 대표 라이브러리
- `remark-gfm`: GFM(GitHub Flavored Markdown) 지원
- `remark-mermaidjs`: 마크다운 내 `mermaid` 블록을 자동으로 mermaid.js로 변환
- `mermaid`: 다이어그램 엔진

## 2. 기본 사용법 예시

````tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMermaid from 'remark-mermaidjs';

const markdown = `
# 예시

```mermaid
graph TD;
  A[시작] --> B[진행];
  B --> C[종료];
````

`;

export default function MarkdownWithMermaid() {
return (
<ReactMarkdown
remarkPlugins={[remarkGfm, remarkMermaid]}
components={{
        // 필요시 커스텀 렌더러 추가 가능
      }} >
{markdown}
</ReactMarkdown>
);
}

````

- 위 예시처럼 마크다운 내에 ```mermaid 코드블록을 작성하면 자동으로 다이어그램이 렌더링됩니다.
- Next.js 등 SSR 환경에서는 반드시 클라이언트 컴포넌트(`'use client'`)로 작성해야 합니다.

## 3. 참고
- [react-markdown 공식문서](https://github.com/remarkjs/react-markdown)
- [remark-mermaidjs 공식문서](https://github.com/remarkjs/remark-mermaidjs)
- [mermaid 공식문서](https://mermaid-js.github.io/mermaid/#/)

---

실제 프로젝트에서는 마크다운 에디터, 위키, 설명서 등 다양한 곳에 활용할 수 있습니다.
````
