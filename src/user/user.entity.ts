import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNKNOWN = 'unknown'
}

export enum UserRole {
    USER = 'user',
    MANAGER = 'manager',
    ADMIN = 'admin'
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

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole

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
