import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    img: string

    @Column({
        type: "double"
    })
    price: number

    @Column({
        type: "varchar",
        length: 100
    })
    name: string

    @Column({
        type: "text"
    })
    @Optional()
    description: string

    @Column({
        type: "integer"
    })
    quantity: number
}
