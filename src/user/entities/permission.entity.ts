import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { RoleEntity } from './role.entity'

export enum PermissionEnum {
    // User Permissions
    CREATE_USER = 'create_user',
    READ_USER = 'read_user',
    UPDATE_USER = 'update_user',
    DELETE_USER = 'delete_user',

    // Role Permissions
    CREATE_ROLE = 'create_role',
    READ_ROLE = 'read_role',
    UPDATE_ROLE = 'update_role',
    DELETE_ROLE = 'delete_role',

    // Permission Management Permissions
    ASSIGN_PERMISSION = 'assign_permission',
    REMOVE_PERMISSION = 'remove_permission',

    // Book Permissions
    CREATE_BOOK = 'create_book',
    READ_BOOK = 'read_book',
    UPDATE_BOOK = 'update_book',
    DELETE_BOOK = 'delete_book',

    // BookStore Permissions
    CREATE_BOOKSTORE = 'create_bookstore',
    READ_BOOKSTORE = 'read_bookstore',
    UPDATE_BOOKSTORE = 'update_bookstore',
    DELETE_BOOKSTORE = 'delete_bookstore'
}

@Entity('permissions')
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ nullable: true })
    description: string

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
