import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

// 퀴즈 본문 엔티티
@Entity({ name: 'quizzes' })
export class QuizEntity {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    // 관련 용어 ID (연관관계 미사용, 숫자 필드만)
    @Index()
    @Column({ type: 'int', nullable: true, comment: '관련 용어 ID (terms.id)' })
    termId?: number;

    @Column({ type: 'text', nullable: false, comment: '문제 내용' })
    question!: string;

    @Column({
        type: 'varchar',
        length: 32,
        comment: "문제 유형(multiple_choice: 객관식 | ox | short_answer: 단답형 | fill_blank: 빈칸 채우기)",
    })
    type!: 'multiple_choice' | 'ox' | 'short_answer' | 'fill_blank';

    @Column({
        type: 'varchar',
        length: 16,
        comment: '난이도(easy | medium | hard)'
    })
    difficulty!: 'easy' | 'medium' | 'hard';

    @CreateDateColumn({ name: 'created_at', comment: '생성일시' })
    createdAt!: Date;
}

// 보기/정답 엔티티
@Entity({ name: 'quiz_options' })
export class QuizOptionEntity {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Index()
    @Column({ type: 'int', nullable: false, comment: '관련 퀴즈 ID (quizzes.id)' })
    quizId!: number;

    @Column({ type: 'text', nullable: false, comment: '보기 내용' })
    optionText!: string;

    @Column({ type: 'boolean', default: false, comment: '정답 여부' })
    isCorrect!: boolean;

    @Column({ type: 'text', nullable: true, comment: '보기 해설 또는 추가 설명' })
    explanation?: string;
}

// 결과 기록 엔티티
@Entity({ name: 'quiz_results' })
export class QuizResultEntity {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Index()
    @Column({ type: 'int', nullable: false, comment: '퀴즈 ID (quizzes.id)' })
    quizId!: number;

    @Index()
    @Column({ type: 'varchar', length: 64, nullable: false, comment: '사용자 ID' })
    userId!: string; // next-auth user id (string) 가정

    @Column({ type: 'boolean', default: false, comment: '정답 여부' })
    isCorrect!: boolean;

    @CreateDateColumn({ name: 'answered_at', comment: '응답 시간' })
    answeredAt!: Date;
}

// 태그 엔티티 (선택)
@Entity({ name: 'quiz_tags' })
export class QuizTagEntity {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Index()
    @Column({ type: 'int', nullable: false, comment: '퀴즈 ID (quizzes.id)' })
    quizId!: number;

    @Index()
    @Column({ type: 'varchar', length: 50, nullable: false, comment: '태그명' })
    tag!: string;
}