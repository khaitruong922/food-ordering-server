import { BaseEntity } from "src/base/base.entity";
import { Entity } from "typeorm";

@Entity('product')
export class Product extends BaseEntity{}
