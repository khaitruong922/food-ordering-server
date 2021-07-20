import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('sub_menu')
export class SubMenu extends BaseEntity{
    @Column({
        type: "varchar",
        length: 16
    })
    name : string

    @Column({
        type: "text"
    })
    description : string
}
