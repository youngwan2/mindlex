import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752465823125 implements MigrationInterface {
    name = 'Migration1752465823125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "emailVerified" character varying, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."name" IS '사용자 닉네임(고유)'; COMMENT ON COLUMN "users"."email" IS '사용자 이메일(고유)'; COMMENT ON COLUMN "users"."password" IS '사용자 비밀번호(소셜로그인 시 null)'; COMMENT ON COLUMN "users"."role" IS '권한(user/admin)'; COMMENT ON COLUMN "users"."provider" IS '소셜/외부 인증 제공자'; COMMENT ON COLUMN "users"."providerId" IS '소셜/외부 인증 제공자 ID'; COMMENT ON COLUMN "users"."emailVerified" IS '이메일 인증 일시'; COMMENT ON COLUMN "users"."image" IS '프로필 이미지 URL'; COMMENT ON COLUMN "users"."createdAt" IS '사용자 생성일'; COMMENT ON COLUMN "users"."updatedAt" IS '사용자 정보 수정일'`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" character varying NOT NULL, "provider" character varying NOT NULL, "providerAccountId" character varying NOT NULL, "refresh_token" character varying, "access_token" character varying, "expires_at" bigint, "token_type" character varying, "scope" character varying, "id_token" character varying, "session_state" character varying, "oauth_token_secret" character varying, "oauth_token" character varying, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")); COMMENT ON COLUMN "accounts"."userId" IS 'FK: UserEntity'; COMMENT ON COLUMN "accounts"."type" IS '계정 타입(oauth, email 등)'; COMMENT ON COLUMN "accounts"."provider" IS '인증 제공자(google, kakao, naver 등)'; COMMENT ON COLUMN "accounts"."providerAccountId" IS '제공자별 계정 ID'; COMMENT ON COLUMN "accounts"."refresh_token" IS '리프레시 토큰'; COMMENT ON COLUMN "accounts"."access_token" IS '액세스 토큰'; COMMENT ON COLUMN "accounts"."expires_at" IS '토큰 만료 시각(UNIX timestamp)'; COMMENT ON COLUMN "accounts"."token_type" IS '토큰 타입'; COMMENT ON COLUMN "accounts"."scope" IS '권한 범위(scope)'; COMMENT ON COLUMN "accounts"."id_token" IS 'ID 토큰(OIDC)'; COMMENT ON COLUMN "accounts"."session_state" IS '세션 상태'; COMMENT ON COLUMN "accounts"."oauth_token_secret" IS 'OAuth1 비밀키'; COMMENT ON COLUMN "accounts"."oauth_token" IS 'OAuth1 토큰'`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionToken" character varying NOT NULL, "userId" uuid NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "UQ_8b5e2ec52e335c0fe16d7ec3584" UNIQUE ("sessionToken"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")); COMMENT ON COLUMN "sessions"."sessionToken" IS '세션 토큰(고유)'; COMMENT ON COLUMN "sessions"."userId" IS 'FK: UserEntity'; COMMENT ON COLUMN "sessions"."expires" IS '만료 일시'`);
        await queryRunner.query(`CREATE TABLE "verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "identifier" character varying NOT NULL, "expires" character varying NOT NULL, CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id")); COMMENT ON COLUMN "verification_tokens"."token" IS '인증 토큰'; COMMENT ON COLUMN "verification_tokens"."identifier" IS '식별자(이메일 등)'; COMMENT ON COLUMN "verification_tokens"."expires" IS '만료 일시'`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`DROP TABLE "verification_tokens"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
