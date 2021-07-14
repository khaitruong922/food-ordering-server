import { Exclude } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

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
        nullable: true,
        default: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg'
    })
    avatarPath: string

    @Column({
        type: 'text',
    })
    address: string

    @Column({
        type: 'varchar',
        length: 12,
    })
    phoneNumber: string

}