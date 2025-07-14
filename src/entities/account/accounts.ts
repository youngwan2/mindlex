import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ValueTransformer } from "typeorm"


const transformer: Record<"date" | "bigint", ValueTransformer> = {
    date: {
        from: (date: string | null) => date && new Date(parseInt(date, 10)),
        to: (date?: Date) => date?.valueOf().toString(),
    },
    bigint: {
        from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
        to: (bigInt?: number) => bigInt?.toString(),
    },
}

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", unique: true, comment: "사용자 닉네임(고유)" })
    name!: string;

    @Column({ type: "varchar", nullable: true, unique: true, comment: "사용자 이메일(고유)" })
    email!: string;

    @Column({ type: "varchar", nullable: true, comment: "사용자 비밀번호(소셜로그인 시 null)" })
    password?: string;

    @Column({ type: "enum", enum: ["user", "admin"], default: "user", comment: "권한(user/admin)" })
    role!: string;

    @Column({ type: "varchar", nullable: true, transformer: transformer.date, comment: "이메일 인증 일시" })
    emailVerified!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "프로필 이미지 URL" })
    image!: string | null;

    @OneToMany(() => SessionEntity, (session) => session.userId)
    sessions!: SessionEntity[];

    @OneToMany(() => AccountEntity, (account) => account.userId)
    accounts!: AccountEntity[];

    @CreateDateColumn({ type: "timestamp", comment: "사용자 생성일" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", comment: "사용자 정보 수정일" })
    updatedAt!: Date;
}

@Entity({ name: "accounts" })
export class AccountEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "uuid", comment: "FK: UserEntity" })
    userId!: string;

    @Column({ type: "varchar", comment: "계정 타입(oauth, email 등)" })
    type!: string;

    @Column({ type: "varchar", comment: "인증 제공자(google, kakao, naver 등)" })
    provider!: string;

    @Column({ type: "varchar", comment: "제공자별 계정 ID" })
    providerAccountId!: string;

    @Column({ type: "varchar", nullable: true, comment: "리프레시 토큰" })
    refresh_token!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "액세스 토큰" })
    access_token!: string | null;

    @Column({ type: "bigint", nullable: true, transformer: transformer.bigint, comment: "토큰 만료 시각(UNIX timestamp)" })
    expires_at!: number | null;

    @Column({ type: "varchar", nullable: true, comment: "토큰 타입" })
    token_type!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "권한 범위(scope)" })
    scope!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "ID 토큰(OIDC)" })
    id_token!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "세션 상태" })
    session_state!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "OAuth1 비밀키" })
    oauth_token_secret!: string | null;

    @Column({ type: "varchar", nullable: true, comment: "OAuth1 토큰" })
    oauth_token!: string | null;

    @ManyToOne(() => UserEntity, (user) => user.accounts, { createForeignKeyConstraints: true })
    user!: UserEntity;
}

@Entity({ name: "sessions" })
export class SessionEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", unique: true, comment: "세션 토큰(고유)" })
    sessionToken!: string;

    @Column({ type: "uuid", comment: "FK: UserEntity" })
    userId!: string;

    @Column({ type: "varchar", transformer: transformer.date, comment: "만료 일시" })
    expires!: string;

    @ManyToOne(() => UserEntity, (user) => user.sessions)
    user!: UserEntity;
}

@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", comment: "인증 토큰" })
    token!: string;

    @Column({ type: "varchar", comment: "식별자(이메일 등)" })
    identifier!: string;

    @Column({ type: "varchar", transformer: transformer.date, comment: "만료 일시" })
    expires!: string;
}