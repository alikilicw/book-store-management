import { Gender, UserEntity } from 'src/user/user.entity'
import { UserRole } from 'src/user/user.entity'

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
    role: UserRole[]
    phone: string
}
export type RegisterResDto = AuthResBaseDto
