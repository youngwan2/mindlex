# Mindlex 브랜드 컬러 및 디자인 가이드

이 문서는 마인드렉스(정신건강 용어/퀴즈 웹앱)의 브랜드 컬러(#ffb900)를 중심으로 한 UI 디자인 가이드입니다.

---

## 1. 브랜드 컬러

- **메인 컬러:** `#ffb900` (밝은 옐로우/골드)
  - HEX: #ffb900
  - RGB: 255, 185, 0
  - 사용 의도: 따뜻함, 희망, 긍정, 친근함, 에너지

### 서브/보조 컬러 예시

- **화이트:** #ffffff (배경, 여백)
- **딥 네이비:** #1a2233 (텍스트, 강조)
- **라이트 그레이:** #f5f5f7 (카드, 섹션 배경)
- **포인트 블루:** #2563eb (링크, 액션)

---

## 2. 컬러 활용 가이드

- **#ffb900**: 버튼, 주요 CTA, 아이콘, 강조 텍스트, 배지 등 포인트 컬러로 사용
- 배경 전체에는 사용을 자제하고, 섹션/카드/버튼/포인트에만 활용
- 다크모드에서도 포인트 컬러로 유지(명도/채도 조정 가능)
- 텍스트/아이콘 위에는 충분한 대비(흰색/딥네이비 등) 확보

---

## 3. UI 컴포넌트 예시

- 버튼: `bg-[#ffb900] hover:bg-[#e6a800] text-white`
- 배지/라벨: `bg-[#ffb900] text-[#1a2233]`
- 강조 텍스트: `<span className="text-[#ffb900] font-bold">...</span>`
- 아이콘: 브랜드 컬러 적용

---

## 4. 심리적/브랜드 효과

- 노란색 계열은 심리적으로 긍정, 희망, 따뜻함, 명확함을 전달
- 정신건강/교육/상담/심리 서비스에 매우 적합
- 친근하고 신뢰감 있는 브랜드 이미지 구축에 효과적

---

## 5. 실무 팁

- 컬러 팔레트는 tailwind.config, CSS 변수 등으로 관리 권장
- 포인트 컬러는 일관성 있게 사용(로고, 버튼, 주요 UI)
- 보조 컬러와의 조화, 접근성(명도 대비) 체크 필수

---

## 6. 브랜드 컬러 호버/포커스/상태별 가이드

- **버튼/배지 등 호버/포커스/액티브 상태**

  - 기본: `bg-[#ffb900]` (메인)
  - 호버: `hover:bg-[#e6a800]` (조금 더 어두운 옐로우, HEX: #e6a800)
  - 액티브: `active:bg-[#cc9900]` (더 진한 옐로우, HEX: #cc9900)
  - 포커스: `focus:ring-2 focus:ring-[#ffb900]/50` (옐로우 포커스 링)

- **텍스트 강조**

  - 기본: `text-[#ffb900]`
  - 호버: `hover:text-[#e6a800]`

- **아이콘/링크**

  - 기본: `text-[#ffb900]`
  - 호버: `hover:text-[#e6a800]`

- **Tailwind 예시**
  ```tsx
  <button className="bg-[#ffb900] hover:bg-[#e6a800] active:bg-[#cc9900] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#ffb900]/50">
    브랜드 버튼
  </button>
  <span className="text-[#ffb900] hover:text-[#e6a800]">브랜드 텍스트</span>
  ```

---

**실무 팁**

- hover/active 컬러는 메인 컬러보다 10~20% 어둡게(명도/채도 조정)
- 포커스 링은 접근성(키보드 네비게이션)까지 고려해 적용
- tailwind.config.js에 커스텀 컬러 변수로 등록해 일관성 있게 사용 권장

---

## 7. Tailwind CSS 유틸리티 클래스 설정 예시

### tailwind.config.js 예시

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ffb900', // 메인
          hover: '#e6a800', // 호버
          active: '#cc9900', // 액티브
        },
      },
    },
  },
};
```

### 사용 예시

- 버튼: `bg-brand hover:bg-brand-hover active:bg-brand-active text-white`
- 텍스트: `text-brand hover:text-brand-hover`
- 포커스: `focus:ring-2 focus:ring-brand/50`

```tsx
<button className="bg-brand hover:bg-brand-hover active:bg-brand-active text-white px-4 py-2 rounded focus:ring-2 focus:ring-brand/50">
  브랜드 버튼
</button>
<span className="text-brand hover:text-brand-hover">브랜드 텍스트</span>
```

---

**실무 팁**

- tailwind.config.js에 커스텀 컬러 등록 시, 프로젝트 전체에서 일관된 유틸리티 클래스로 사용 가능
- 기존 `bg-[#ffb900]` 대신 `bg-brand` 등으로 치환하면 유지보수와 협업이 쉬워집니다.

---

이 가이드는 마인드렉스의 UI/UX, 마케팅, 개발 등 모든 영역에서 브랜드 일관성을 유지하는 기준으로 활용할 수 있습니다.
