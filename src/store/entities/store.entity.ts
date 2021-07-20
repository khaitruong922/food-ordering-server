import { BaseEntity } from "src/base/base.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";
import { Column, Entity } from "typeorm";

@Entity('store')
export class Store extends BaseEntity{
    @Column({
        type: 'varchar',
        length: '255'
    })
    name : string

    @Column({
        type: 'varchar',
        length: 255
    })
    description : string

    @Column({
        type: 'varchar',
        length: 255
    })
    address : string

    @Column({
        nullable: true
    })
    sub_menu : SubMenu
}
