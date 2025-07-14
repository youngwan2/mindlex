import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



/**
 * 용어 카테고리(TermCategory) 엔티티
 * - 용어 사전의 카테고리(분류) 정보를 관리
 * - 계층형 구조(상위/하위 카테고리) 지원
 *
 * 필드 설명:
 *   - id: PK, 카테고리 고유번호
 *   - parentCategory: 상위 카테고리(자기참조, nullable)
 *   - children: 하위 카테고리 목록(자기참조)
 *   - name: 카테고리 이름(고유)
 *   - createdAt: 생성일
 */
@Entity("term_categories")
export class TermCategory {
    @PrimaryGeneratedColumn("identity")
    id!: number;

    @ManyToOne(() => TermCategory, (category) => category.children, { nullable: true }) // 상위 카테고리 (자기참조)
    parentCategory?: TermCategory;

    @OneToMany(() => TermCategory, (category) => category.parentCategory) // 하위 카테고리 목록
    children?: TermCategory[];

    @Column({ length: 50, nullable: false, unique: true, comment: "카테고리 이름" })
    name!: string;

    @CreateDateColumn({ comment: "카테고리 생성일" })
    createdAt!: Date;
}