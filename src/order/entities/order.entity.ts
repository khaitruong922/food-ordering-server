import { Optional } from "@nestjs/common";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

export enum OrderStatus{
    PENDING = "PENDING",
    RECEIVED = "RECEIVED",
    PREPARING = "PREPARING",
    DELIVERING = " DELIVERING",
    COMPLETED = "COMPLETED"
}

@Entity('order')
export class Order extends BaseEntity{
    @Column()
    address : string

    @Column()
    @Optional()
    note : string

    @Column()
    status : OrderStatus

    @Column()
    totalPrice : number

    @Column()
    deliveredTime : Date
}
