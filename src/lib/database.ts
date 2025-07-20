import * as dotenv from 'dotenv';

import 'reflect-metadata';
import { DataSource } from 'typeorm';


import { AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity } from '../entities/account/accounts';
import { TermEntity } from '../entities/term/Term';
import { TermCategoryEntity } from '../entities/category/categories';


// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5440,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.TYPEORM_SYNC === 'true', // 운영 환경에서는 false 권장
  logging: process.env.TYPEORM_LOG === 'true',
  // entities: [__dirname + '/../entities/**/*.ts'], // 엔티티 파일 경로 수정
  // migrations: [__dirname + '/../migrations/*.{ts,js}'], // 마이그레이션 파일 경로 수정
  // subscribers: [__dirname + '/../subscribers/*.{ts,js}'],
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity, TermEntity, TermCategoryEntity], // 엔티티 파일 경로 수정
  migrations: [], // 마이그레이션 파일 경로 수정
  subscribers: [],
});



/**
 * 데이터베이스 연결을 가져오는 함수
 * @returns {Promise<DataSource>} 데이터베이스 연결 객체
 * @throws {Error} 데이터베이스 연결 실패 시 에러 발생
 * @description
 * 이 함수는 데이터베이스 연결을 초기화하고, 초기화된 연결 객체를 반환합니다.
 * 데이터베이스 연결이 이미 초기화되어 있는 경우, 기존 연결을 반환합니다.  
 * 초기화되지 않은 경우, 연결을 초기화하고 반환합니다.
 * 즉, 싱글톤 패턴을 사용하여 데이터베이스 연결을 관리합니다.
 */
export async function getDataSource() {

  // 데이터베이스 연결이 초기화되지 않은 경우 초기화
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource
}

