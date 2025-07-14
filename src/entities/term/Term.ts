import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'terms' })
export class TermEntity {
    @PrimaryGeneratedColumn('identity')
    id!: number;

    @Column({ length: 100, nullable: false, comment: '한글 용어' })
    termKo!: string;

    @Column({ length: 100, nullable: true, comment: '영어 용어' })
    termEn?: string;

    @Column({ length: 100, nullable: true, comment: '한자 용어' })
    termHanja?: string;

    @Column({ type: 'text', nullable: false, comment: '쉬운 설명(한 줄 요약)' })
    definition!: string;

    @Column({ type: 'text', nullable: true, comment: '상세 설명' })
    description?: string;

    @Column({ length: 50, nullable: true, comment: '약어 (abbreviation / initialism)' })
    abbreviation?: string;

    @Column({ length: 20, nullable: true, comment: '시각자료 타입(image/mermaid/svg/none)' })
    visualType?: string;

    @Column({ type: 'text', nullable: true, comment: '시각자료(이미지/도식) 링크' })
    visualUrl?: string;

    @Column({ type: 'text', nullable: true, comment: 'mermaid/SVG 등 그래프 코드' })
    visualCode?: string;

    @Column({ type: 'text', nullable: true, comment: '발음 듣기(음성 파일 링크)' })
    audioUrl?: string;

    @Column({ default: true, comment: '공개 여부' })
    isPublished!: boolean;

    @Column({ nullable: false, comment: '카테고리 ID' })
    categoryId!: number;

    @CreateDateColumn({ comment: '생성일' })
    createdAt!: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt!: Date;
}