import { BaseEntity } from "src/base/base.entity";
import { PublicFile } from "src/file/entities/public-file.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    price: number

    @Column({
        type: "varchar",
        length: 100
    })
    name: string

    @Column({
        type: "text",
        nullable: true,
    })
    description: string

    @Column()
    quantity: number

    @JoinColumn()
    @OneToOne(
        () => PublicFile,
        {
            eager: true,
            nullable: true
        }
    )
    image?: PublicFile;

    @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.product)
    orderDetails: OrderDetail[]

    @ManyToOne(() => SubMenu, (subMenu: SubMenu) => subMenu.products)
    subMenu: SubMenu
}
