# Chapter 2: Tiptap 기본 사용법

## 1. 에디터 인스턴스 생성

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [StarterKit],
  content: '<p>Hello Tiptap!</p>',
});
```

## 2. 에디터 렌더링

```tsx
<EditorContent editor={editor} />
```

## 3. 상태 관리 및 이벤트

- onUpdate, getHTML, getJSON 등 활용

---

> 다음 장에서는 Tiptap 확장(Extension)과 커스터마이징 방법을 다룹니다.
