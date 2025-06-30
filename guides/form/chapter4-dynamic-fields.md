# Chapter 4: 동적 필드/배열 관리 (useFieldArray)

## 1. useFieldArray 기본 사용법

```tsx
import { useForm, useFieldArray } from 'react-hook-form';

const { control, register } = useForm();
const { fields, append, remove } = useFieldArray({ control, name: 'items' });
```

### 각 훅 설명

- `useForm`: 폼 전체 상태와 메서드를 제공하는 기본 훅. 여기서 반환된 `control`과 `register`를 하위 훅 및 필드에 전달.
- `register`: 개별 입력 필드를 react-hook-form에 연결.
- `control`: useFieldArray 등 고급 훅에서 폼 상태를 공유할 때 사용.
- `useFieldArray`: 배열 형태의 입력 필드를 동적으로 추가/삭제할 수 있게 해주는 훅.
- `fields`: 현재 배열 필드의 상태(각 항목의 id 등 포함).
- `append`: 배열에 새 항목 추가.
- `remove`: 배열에서 항목 삭제.

## 2. 동적으로 필드 추가/삭제 예제

```tsx
{
  fields.map((field, idx) => <input key={field.id} {...register(`items.${idx}.value`)} />);
}
<button type="button" onClick={() => append({ value: '' })}>
  추가
</button>;
```

## 3. 실전 팁

- 배열 데이터 처리, 조건부 렌더링 등

---

> 다음 장에서는 고급 패턴 및 실전 활용법을 다룹니다.
