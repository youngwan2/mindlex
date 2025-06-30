# 8장: TypeORM 실전 패턴과 구조 설계

이 장에서는 실무에서 자주 쓰이는 TypeORM 활용 패턴과 구조 설계 방법을 다룹니다.

## 8.1. 서비스 레이어 패턴

- 비즈니스 로직을 서비스 클래스로 분리해 코드의 재사용성과 테스트 용이성 향상
- 예시:

  ```typescript
  // src/services/userService.ts
  import { AppDataSource } from '../data-source';
  import { User } from '../entities/User';

  export class UserService {
    async findByEmail(email: string) {
      const repo = AppDataSource.getRepository(User);
      return repo.findOneBy({ email });
    }
  }
  ```

## 8.2. DTO(Data Transfer Object) 활용

- API 입력/출력 데이터 구조를 명확히 분리
- 예시:
  ```typescript
  export interface CreateUserDto {
    name: string;
    email: string;
  }
  ```

## 8.3. Repository/Service/Controller 계층 분리

- 유지보수성과 확장성을 높이기 위해 계층별로 역할 분리

---

실전 프로젝트에서 구조화된 코드를 작성하는 방법을 익힙니다.
