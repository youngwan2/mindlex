# 기능(Feature) 기반 폴더 구조 예시

Next.js + TypeORM 프로젝트에서 기능별로 컴포넌트를 관리할 수 있는 구조 예시입니다.

```
src/
  features/
    user/
      components/
        UserList.tsx
        UserForm.tsx
      api/
        userApi.ts
      entities/
        User.ts
      hooks/
        useUser.ts
      utils/
        userUtils.ts
      index.ts
    post/
      components/
        PostList.tsx
        PostForm.tsx
      api/
        postApi.ts
      entities/
        Post.ts
      hooks/
        usePost.ts
      utils/
        postUtils.ts
      index.ts
  shared/
    components/
    utils/
    types/
  app/
  data-source.ts
  ...
```

- `features/`: 주요 도메인(기능)별로 폴더 분리
- 각 기능 폴더 내에 컴포넌트, API, 엔티티, 훅, 유틸 등 세분화
- `shared/`: 여러 기능에서 공통으로 사용하는 코드

---

## 폴더별 파일 작성 가이드

### components/

- 해당 도메인(기능)에서 사용하는 React 컴포넌트 파일을 둡니다.
- 예시: `UserList.tsx`, `PostForm.tsx`
- **팁:** UI, 상태, 이벤트 처리 등 컴포넌트별로 분리해 작성하세요.
- **예시 코드:**
  ```tsx
  // UserList.tsx
  import React from 'react';
  import { User } from '../entities/User';
  export function UserList({ users }: { users: User[] }) {
    return (
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    );
  }
  ```

### api/

- API 요청, 서버 통신, 데이터 fetch 관련 파일을 둡니다.
- 예시: `userApi.ts`, `postApi.ts`
- **팁:** axios, fetch 등으로 REST/GraphQL 요청 함수 작성, 응답 타입 정의
- **예시 코드:**
  ```ts
  // userApi.ts
  import axios from 'axios';
  import { User } from '../entities/User';
  export async function fetchUsers(): Promise<User[]> {
    const res = await axios.get('/api/users');
    return res.data;
  }
  ```

### entities/

- TypeORM Entity(테이블 매핑 클래스) 파일을 둡니다.
- 예시: `User.ts`, `Post.ts`
- **팁:** DB 스키마와 매핑되는 속성, 관계, 데코레이터를 명확히 작성
- **예시 코드:**
  ```ts
  // User.ts
  import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
  }
  ```

### hooks/

- 커스텀 훅(React Hook) 파일을 둡니다.
- 예시: `useUser.ts`, `usePost.ts`
- **팁:** 데이터 fetch, 상태 관리, 비즈니스 로직을 훅으로 분리
- **예시 코드:**
  ```ts
  // useUser.ts
  import { useEffect, useState } from 'react';
  import { fetchUsers } from '../api/userApi';
  import { User } from '../entities/User';
  export function useUser() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
      fetchUsers().then(setUsers);
    }, []);
    return users;
  }
  ```

### utils/

- 해당 도메인에서만 사용하는 유틸리티 함수, 상수 등을 둡니다.
- 예시: `userUtils.ts`, `postUtils.ts`
- **팁:** 포맷터, 변환 함수, 공통 로직 등
- **예시 코드:**
  ```ts
  // userUtils.ts
  export function getUserInitial(name: string) {
    return name.charAt(0).toUpperCase();
  }
  ```

### index.ts

- 해당 도메인 폴더의 엔트리 포인트(내보내기) 역할
- **팁:** 주요 컴포넌트, 훅, API, 엔티티 등을 한 번에 export
- **예시 코드:**
  ```ts
  // index.ts
  export * from './components/UserList';
  export * from './api/userApi';
  export * from './entities/User';
  export * from './hooks/useUser';
  export * from './utils/userUtils';
  ```
- **사용 예시:**

  ```tsx
  // 다른 feature 또는 app에서 한 번에 import 가능
  import { UserList, useUser, fetchUsers, User } from '@/features/user';

  export default function Page() {
    const users = useUser();
    return <UserList users={users} />;
  }
  ```

### shared/

- 여러 도메인에서 공통으로 사용하는 컴포넌트, 유틸, 타입 등을 둡니다.
- 예시: `Button.tsx`, `dateUtils.ts`, `types.ts`
- **예시 코드:**
  ```ts
  // Button.tsx
  import React from 'react';
  export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props}>{children}</button>;
  }
  ```

---

이 가이드를 참고해 각 폴더에 역할에 맞는 파일을 작성하면, 유지보수성과 확장성이 뛰어난 구조를 만들 수 있습니다.
