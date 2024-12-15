import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { UserEntity } from './user.entity'

export enum RoleEnum {
    USER = 'user',
    MANAGER = 'manager',
    ADMIN = 'admin'
}

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, enum: true })
    name: string

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[]

    //   @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
    //   @JoinTable()
    //   permissions: Permission[];
}
