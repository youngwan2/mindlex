# Chapter 3: Tiptap 확장(Extension)과 커스터마이징

## 1. Extension이란?

- 에디터의 기능(툴바, 단축키, 노드 등)을 확장하는 플러그인 구조

## 2. StarterKit 외 확장 추가 예시

```tsx
import Underline from '@tiptap/extension-underline';

const editor = useEditor({
  extensions: [StarterKit, Underline],
});
```

## 3. 커스텀 Extension 만들기

- 새로운 노드/마크/커맨드 직접 구현 가능

---

> 다음 장에서는 실전에서 자주 쓰는 확장(테이블, 코드블록, 이미지 등) 활용법을 다룹니다.
