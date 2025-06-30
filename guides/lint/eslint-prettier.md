# ESLint와 Prettier 충돌 방지 가이드

Prettier와 ESLint를 함께 사용할 때 코드 스타일 규칙이 겹쳐 충돌이 발생할 수 있습니다. 아래 방법을 따르면 충돌 없이 두 도구를 병행할 수 있습니다.

## 1. 필요한 패키지 설치

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## 2. ESLint 설정에 Prettier 적용

`.eslintrc` 또는 `eslint.config.mjs`에 아래 내용을 추가하세요:

### 예시 (eslint.config.mjs)

```js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  // ...기존 설정...
  extends: [
    // ...기존 확장...
    'plugin:prettier/recommended',
  ],
});
```

## 3. 추천 워크플로우

- 코드 저장 시 자동 포맷: VSCode에서 "Format on Save" 활성화
- `npx prettier --write .`로 전체 포맷
- `npm run lint -- --fix`로 ESLint 자동 수정

---

이렇게 설정하면 Prettier와 ESLint가 충돌 없이 함께 동작합니다.
