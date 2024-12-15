import { Gender, UserEntity } from '../entities/user.entity'

export type CreateUserDto = Pick<UserEntity, 'username' | 'email' | 'gender' | 'phone' | 'password'> & {
    roleIds: number[]
}
export type FindUserDto = {
    id?: number
    username?: string
    email?: string
    gender?: Gender
    phone?: string
}
export type UpdateUserDto = FindUserDto

export type UserRoleDto = {
    roleIds: number[]
}
