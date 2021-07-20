import { BaseEntity } from "src/base/base.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";
import { Column, Entity } from "typeorm";

@Entity('store')
export class Store extends BaseEntity {
    @Column({
        type: 'varchar',
        length: '100',
    })
    name: string

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string

    @Column({
        type: 'text',
    })
    address: string

    @Column({
        type: 'text',
        nullable: true,
        default: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
    })
    img: string
}
