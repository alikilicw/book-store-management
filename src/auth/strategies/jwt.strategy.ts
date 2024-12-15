import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Constants } from 'src/common/constants.config'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/services/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Constants.ACCESS_TOKEN_SECRET_KEY
        })
    }

    async validate(payload: any): Promise<UserEntity> {
        const user = await this.userService.findById(payload.id, 'confirmCode')
        if (user.isActive) delete user.confirmCode
        console.log('CCC')

        return user
    }
}
