import { Gender, UserEntity, UserRole } from './user.entity'

export type CreateUserDto = Pick<UserEntity, 'username' | 'email' | 'gender' | 'role' | 'phone' | 'password'>
export type FindUserDto = {
    username?: string
    email?: string
    gender?: Gender
    phone?: string
    role?: UserRole
}
export type UpdateUserDto = FindUserDto
