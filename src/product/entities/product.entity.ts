import { BaseEntity } from "src/base/base.entity";
import { PublicFile } from "src/file/entities/public-file.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";
import { Expose } from "class-transformer";
import { Store } from "src/store/entities/store.entity";

@Entity('product')
export class Product extends BaseEntity {
    @Column({ type: 'real' })
    price: number

    @Column({
        type: "varchar",
        length: 100
    })
    name: string

    @Column({
        type: "text",
        nullable: true,
        default: "",
    })
    description: string


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

    @ManyToOne(() => SubMenu, (subMenu: SubMenu) => subMenu.products, { onDelete: 'CASCADE', })
    subMenu: SubMenu
}
