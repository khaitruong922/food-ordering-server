import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Store } from "src/store/entities/store.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";

@Entity('category')
export class Category extends BaseEntity {
    @Column({
        type: "text",
        unique: true
    })
    name: string

    @ManyToMany(() => Store, (store: Store) => store.categories)
    @JoinTable()
    stores: Store[];
}
