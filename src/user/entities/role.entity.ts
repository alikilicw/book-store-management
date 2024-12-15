import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { UserEntity } from './user.entity'
import { PermissionEntity } from './permission.entity'

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

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles, { eager: true })
    @JoinTable({
        name: 'role_permission'
    })
    permissions: PermissionEntity[]
}
