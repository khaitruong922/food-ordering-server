import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('category')
export class Category extends BaseEntity {
    @Column({
        type: "text",
        unique: true
    })
    name: string
}
