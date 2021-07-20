import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity } from "typeorm";

@Entity('order_detail')
export class OrderDetail extends BaseEntity {
    // @Column()
    // product: Product

    @Column({
        type: "integer"
    })
    quantity: number

    @Column({
        type: "double",
    })
    price: number
}
