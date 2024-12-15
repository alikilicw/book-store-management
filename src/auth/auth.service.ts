import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserEntity } from 'src/user/entities/user.entity'
import { LoginReqDto, LoginResDto, RegisterReqDto, RegisterResDto } from './auth.dto'
import { sign } from 'jsonwebtoken'
import { Constants } from 'src/common/constants.config'
import { hash, compare } from 'bcrypt'
import { OtpService } from 'src/auth/otp/otp.service'
import generateRandomVerificationCode from 'src/common/util/generate-code'
import { UserService } from 'src/user/services/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private otpService: OtpService
    ) {}

    async register(registerReqDto: RegisterReqDto): Promise<RegisterResDto> {
        registerReqDto.password = await hash(registerReqDto.password, 10)

        let user = await this.userService.create(registerReqDto)

        const confirmationCode = generateRandomVerificationCode()

        user.confirmCode = confirmationCode
        await this.userService.save(user)

        await this.otpService.sendMail(user.email, user.id, confirmationCode)
        const token = await this.createToken(user, '5m')
        return {
            token
        }
    }

    async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
        const user = await this.userService.findByUsername(loginReqDto.username, 'password')
        if (!user) throw new NotFoundException('User not found.')
        if (!user.isActive) throw new BadRequestException('Verify email first.')

        const passOk = await compare(loginReqDto.password, user.password)
        if (!passOk) throw new BadRequestException('Password is incorrect.')

        const token = await this.createToken(user, '30d')

        delete user.password

        return {
            user,
            token
        }
    }

    async createToken(user: UserEntity, expiresIn: string): Promise<string> {
        return sign({ id: user.id, username: user.username }, Constants.ACCESS_TOKEN_SECRET_KEY, { expiresIn })
    }

    async confirm(user: UserEntity, code: string): Promise<boolean> {
        if (code != user.confirmCode) throw new UnauthorizedException('Invalid code.')

        user.isActive = true
        user.confirmCode = null
        await this.userService.save(user)

        return true
    }
}
