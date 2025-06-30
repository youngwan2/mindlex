# Prettier 설정 가이드 (Next.js 프로젝트)

이 문서는 mindlex(Next.js) 프로젝트에 Prettier를 적용하는 방법을 안내합니다.

## 1. Prettier 패키지 설치

```bash
npm install --save-dev prettier
```

## 2. Prettier 설정 파일 생성

프로젝트 루트에 `.prettierrc` 파일을 생성하고 예시와 같이 작성합니다:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

## 3. .prettierignore 파일 생성 (선택)

포맷팅에서 제외할 파일/폴더를 지정하려면 `.prettierignore` 파일을 생성합니다:

```
node_modules
.next
build
dist
```

## 4. ESLint와 충돌 방지 설정

Prettier와 ESLint를 함께 사용할 때 충돌을 방지하려면 아래와 같이 설정하세요.

1. 패키지 설치:
   ```bash
   npm install --save-dev eslint-config-prettier eslint-plugin-prettier
   ```
2. ESLint 설정 파일(`eslint.config.mjs` 등)에 아래를 추가:
   ```js
   // ...기존 설정...
   extends: [
     // ...기존 확장...
     'plugin:prettier/recommended',
   ],
   ```
3. VSCode에서 "Format on Save"와 Prettier 확장 사용 권장

> 자세한 내용은 `guides/eslint-prettier.md` 참고

## 5. VSCode 확장 추천 (선택)

- Prettier - Code formatter 확장 설치
- "Format on Save" 옵션 활성화 권장

## 6. 사용 방법

```bash
npx prettier --write .
```

위 명령어로 전체 코드 포맷팅이 가능합니다.

---

Prettier를 적용하면 코드 스타일이 일관되고 협업이 쉬워집니다.
