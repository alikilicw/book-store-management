import { CreateUserDto } from 'src/user/dto/user.dto'
import { UserEntity } from 'src/user/entities/user.entity'

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

export type RegisterReqDto = CreateUserDto
export type RegisterResDto = AuthResBaseDto
