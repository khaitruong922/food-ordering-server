import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @Column({
        type: 'text',
        nullable: true,
        default: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
    })
    img: string

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
}
