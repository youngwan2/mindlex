import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";



@Unique(["userId", "targetId", "type"])
@Entity({ name: "favorites" })
export class FavoritesEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", comment: "사용자 ID" })
    userId!: string;


    @Column({ comment: "북마크 대상 ID" })
    targetId!: number;

    @Column({ comment: "북마크 대상의 유형" })
    type!: string;

    @CreateDateColumn({ comment: "북마크 생성일" })
    createdAt!: Date;

}