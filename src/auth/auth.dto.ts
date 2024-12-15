import { RoleEntity } from 'src/user/entities/role.entity'
import { Gender, UserEntity } from 'src/user/entities/user.entity'

type AuthReqBaseDto = {
    username: string
    password: string
}

type AuthResBaseDto = {
    token: string
}

export type LoginReqDto = AuthReqBaseDto

export type LoginResDto = AuthResBaseDto & {
    user: UserEntity
}

export type RegisterReqDto = AuthReqBaseDto & {
    email: string
    gender: Gender
    roles: RoleEntity[]
    phone: string
}
export type RegisterResDto = AuthResBaseDto
