import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RoleEntity } from './role.entity'

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNKNOWN = 'unknown'
}

export type UserSelectFalse = {
    confirmCode?: boolean
    password?: boolean
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ type: 'enum', enum: Gender, default: Gender.UNKNOWN })
    gender: Gender

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: false })
    @JoinTable({
        name: 'user_role'
    })
    roles: RoleEntity[]

    @Column({ unique: true })
    phone: string

    @Column({ type: 'boolean', default: false })
    isActive: boolean

    @Column({ select: false })
    password: string

    @Column({ select: false, nullable: true })
    confirmCode: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
