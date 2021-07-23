import { BaseEntity } from "src/base/base.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";

@Entity('category')
export class Category extends BaseEntity {
    @Column({
        type: "text",
        unique: true
    })
    name: string

    @ManyToMany(type => Product, {eager: true})
    @JoinTable({
        name: "category_products",
        joinColumn: {
            name: "category",
            referencedColumnName:"id"
        },
        inverseJoinColumn: {
            name: "product",
            referencedColumnName:"id"
        }
    })
    products: Product[];
}
