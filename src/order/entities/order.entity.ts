import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum OrderStatus {
    PENDING = "PENDING",
    RECEIVED = "RECEIVED",
    PREPARING = "PREPARING",
    DELIVERING = " DELIVERING",
    COMPLETED = "COMPLETED"
}

@Entity('order')
export class Order extends BaseEntity {
    @Column({
        type: "text",
    })
    address: string

    @Column({
        type: "text",
        nullable: true,
    })
    note: string

    @Column({ enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus

    @Column()
    totalPrice: number

    @Column()
    deliveredTime: Date

    @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
    orderDetails: OrderDetail[]

    @ManyToOne(() => User, (user: User) => user.orders)
    user: User
}
