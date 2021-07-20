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
        length: 255
    })
    address: string

    @Column({
        type: "text",
        length: 255
    })
    @Optional()
    note: string

    @Column()
    status: OrderStatus

    @Column({
        type: "double",
    })
    totalPrice: number

    @Column()
    deliveredTime: Date
}
