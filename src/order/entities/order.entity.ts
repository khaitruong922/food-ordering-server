import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

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
}
