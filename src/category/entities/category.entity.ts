import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('category')
export class Category extends BaseEntity {
    @Column({
        type: "varchar",
        length: 20,
        unique: true
    })
    name: string
}
