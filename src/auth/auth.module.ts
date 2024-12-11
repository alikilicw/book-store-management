import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/user/user.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailConfig } from './otp/otp.config'
import { OtpService } from './otp/otp.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Constants } from 'src/common/constants.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [
        forwardRef(() => UserModule),
        MailerModule.forRoot(mailConfig),
        PassportModule,
        JwtModule.register({
            secret: Constants.ACCESS_TOKEN_SECRET_KEY
        })
    ],
    providers: [AuthService, OtpService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule, PassportModule]
})
export class AuthModule {}
