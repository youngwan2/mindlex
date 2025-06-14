import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';

// 환경 변수 로드
const {
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT
} = process.env;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || '',
    database: POSTGRES_DB || 'mydb',
    synchronize: true,     // 개발 시 true, 운영 시 false 권장
    logging: true,
    entities: [User],
});
