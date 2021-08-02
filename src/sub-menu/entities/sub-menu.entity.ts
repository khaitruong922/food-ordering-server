import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Store } from "src/store/entities/store.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('sub_menu')
export class SubMenu extends BaseEntity {
    @Column({
        type: "varchar",
        length: 100
    })
    name: string

    @ManyToOne(() => Store, (store: Store) => store.subMenus, { onDelete: 'CASCADE' })
    store: Store

    @OneToMany(() => Product, (product: Product) => product.subMenu)
    products: Product
}
