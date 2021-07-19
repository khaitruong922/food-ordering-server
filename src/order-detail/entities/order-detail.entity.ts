import { BaseEntity } from "src/base/base.entity";
import { Entity } from "typeorm";

@Entity('order_detail')
export class OrderDetail extends BaseEntity{}
