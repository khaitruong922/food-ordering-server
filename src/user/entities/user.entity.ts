import { Exclude } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { PublicFile } from "src/file/entities/public-file.entity";
import { Order } from "src/order/entities/order.entity";
import { Role } from "src/role/role.enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string

    @Column({
        type: 'varchar',
        length: 16,
        unique: true,
    })
    username: string

    @Column({
        type: 'varchar',
        length: 255,
        // unique: true
    })
    email: string

    @Exclude()
    @Column({
        type: 'varchar',
        length: 100,
    })
    password: string


    @Column({
        type: 'text',
    })
    address: string

    @Column({
        type: 'varchar',
        length: 15,
    })
    phoneNumber: string

    @Column({ enum: Role, default: Role.User })
    role: Role

    @JoinColumn()
    @OneToOne(
        () => PublicFile,
        {
            eager: true,
            nullable: true
        }
    )
    avatar?: PublicFile;

    @OneToMany(() => Order, (order: Order) => order.user)
    orders: Order[]
}