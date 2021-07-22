import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('category')
export class Category extends BaseEntity {
    @Column({
        type: "text",
        unique: true
    })
    name: string

    @ManyToMany(type => Product, product => product.categories,)
    @JoinTable()
    products: Product[];
}
