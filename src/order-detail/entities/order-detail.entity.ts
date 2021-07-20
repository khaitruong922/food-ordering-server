import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity } from "typeorm";

@Entity('order_detail')
export class OrderDetail extends BaseEntity {
    @Column()
    quantity: number

    @Column()
    price: number
}
