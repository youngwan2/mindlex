# Chapter 4: 실전 확장 활용 (테이블, 코드블록, 이미지 등)

## 1. 테이블, 코드블록, 이미지 등 확장 설치

```bash
npm install @tiptap/extension-table @tiptap/extension-code-block @tiptap/extension-image
```

## 2. 확장 적용 예시

```tsx
import Table from '@tiptap/extension-table';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';

const editor = useEditor({
  extensions: [StarterKit, Table, CodeBlock, Image],
});
```

## 3. 실전 팁

- 각 확장별 옵션, 커스텀 툴바 등

---

> 다음 장에서는 Tiptap 에디터의 커스텀 UI/툴바 구현 및 실무 적용 팁을 다룹니다.
