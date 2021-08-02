import { BaseEntity } from "src/base/base.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('order_detail')
export class OrderDetail extends BaseEntity {
    @Column()
    quantity: number

    @Column({ type: 'real' })
    price: number

    @ManyToOne(() => Order, (order: Order) => order.orderDetails, { onDelete: 'CASCADE' })
    order: Order

    @ManyToOne(() => Product, (product: Product) => product.orderDetails)
    product: Product

}
