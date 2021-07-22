import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { PublicFile } from "src/file/entities/public-file.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    price: number

    @Column({
        type: "varchar",
        length: 100
    })
    name: string

    @Column({
        type: "text",
        nullable: true,
    })
    description: string

    @Column()
    quantity: number

    @JoinColumn()
    @OneToOne(
        () => PublicFile,
        {
            eager: true,
            nullable: true
        }
    )
    image?: PublicFile;
}
