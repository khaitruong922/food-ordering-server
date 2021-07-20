import { BaseEntity } from "src/base/base.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";
import { Column, Entity } from "typeorm";

@Entity('store')
export class Store extends BaseEntity{
    @Column({
        type: 'varchar',
        length: '100'
    })
    name : string

    @Column({
        type: 'text',
    })
    description : string

    @Column({
        type: 'text',
    })
    address : string

    @Column({
        type: 'text',
    })
    img : string
}
