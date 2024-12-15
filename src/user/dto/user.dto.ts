import { RoleEntity } from '../entities/role.entity'
import { Gender, UserEntity } from '../entities/user.entity'

export type CreateUserDto = Pick<UserEntity, 'username' | 'email' | 'gender' | 'roles' | 'phone' | 'password'>
export type FindUserDto = {
    username?: string
    email?: string
    gender?: Gender
    phone?: string
    roles?: RoleEntity[]
}
export type UpdateUserDto = FindUserDto
