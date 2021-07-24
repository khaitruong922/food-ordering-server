import { BaseEntity } from "src/base/base.entity";
import { Category } from "src/category/entities/category.entity";
import { PublicFile } from "src/file/entities/public-file.entity";
import { SubMenu } from "src/sub-menu/entities/sub-menu.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from "typeorm";

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

    @JoinColumn()
    @OneToOne(
        () => PublicFile,
        {
            eager: true,
            nullable: true
        }
    )
    image?: PublicFile;

    @OneToMany(() => SubMenu, (subMenu: SubMenu) => subMenu.store)
    subMenus: SubMenu[]


    @ManyToMany(() => Category, (category: Category) => category.stores)
    categories: Category[]
}
