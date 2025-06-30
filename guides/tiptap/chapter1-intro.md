# Chapter 1: Tiptap 소개 및 기본 개념

## 1. Tiptap이란?

- Tiptap은 ProseMirror 기반의 강력한 Headless WYSIWYG 에디터 라이브러리입니다.
- React, Vue 등 다양한 프레임워크에서 사용 가능하며, 커스터마이징이 매우 뛰어남.

## 2. 주요 특징

- **Headless(디자인 자유)**: UI가 강제되지 않아 원하는 대로 에디터 UI를 직접 구현할 수 있습니다.
- **확장성, 플러그인 구조**: 다양한 기능을 Extension(확장) 형태로 추가/제거할 수 있습니다.
- **Markdown, Table, Mention 등 다양한 확장 지원**: 실무에서 자주 쓰는 기능을 공식/서드파티 확장으로 쉽게 적용할 수 있습니다.

## 3. 설치 방법

```bash
npm install @tiptap/react @tiptap/starter-kit
```

### 주요 패키지 설명
- `@tiptap/react`: React에서 Tiptap을 사용할 수 있게 해주는 공식 패키지입니다. 핵심 컴포넌트와 훅(useEditor, EditorContent 등)을 제공합니다.
- `@tiptap/starter-kit`: Bold, Italic, Heading 등 기본적인 에디터 기능이 포함된 확장(Extension) 모음입니다. 대부분의 프로젝트에서 필수로 사용합니다.

---

> 다음 장에서는 Tiptap의 기본 사용법과 에디터 인스턴스 생성 방법을 다룹니다.
