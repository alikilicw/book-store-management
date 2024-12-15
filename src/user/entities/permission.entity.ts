import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { RoleEntity } from './role.entity'

export enum PermissionEnum {
    // User Permissions
    CREATE_USER = 'create_user',
    READ_USER = 'read_user',
    UPDATE_USER = 'update_user',
    DELETE_USER = 'delete_user',
    ADD_ROLE_TO_USER = 'add_role_to_user',
    DELETE_ROLE_FROM_USER = 'delete_role_from_user',

    // Role Permissions
    CREATE_ROLE = 'create_role',
    READ_ROLE = 'read_role',
    UPDATE_ROLE = 'update_role',
    DELETE_ROLE = 'delete_role',
    ADD_PERMISSION_TO_ROLE = 'add_permission_to_role',
    DELETE_PERMISSION_FROM_ROLE = 'delete_permission_from_role',

    // Permission Management Permissions
    CREATE_PERMISSION = 'create_permission',
    READ_PERMISSION = 'read_permission',
    UPDATE_PERMISSON = 'update_permission',
    DELETE_PERMISSION = 'delete_permission',

    // Book Permissions
    CREATE_BOOK = 'create_book',
    READ_BOOK = 'read_book',
    UPDATE_BOOK = 'update_book',
    DELETE_BOOK = 'delete_book',

    // BookStore Permissions
    CREATE_BOOKSTORE = 'create_bookstore',
    READ_BOOKSTORE = 'read_bookstore',
    UPDATE_BOOKSTORE = 'update_bookstore',
    DELETE_BOOKSTORE = 'delete_bookstore',
    ADD_BOOK_TO_BOOKSTORE = 'add_book_to_bookstore',
    DELETE_BOOK_FROM_BOOKSTORE = 'delete_book_from_bookstore'
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
