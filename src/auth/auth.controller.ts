import { Body, Controller, Get, Post, Query, Request, UseGuards, UsePipes } from '@nestjs/common'
import { LoginReqDto, LoginResDto, RegisterReqDto, RegisterResDto } from './auth.dto'
import { AuthService } from './auth.service'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import AuthValidation from './auth.validation'
import { ResponseDto } from 'src/common/dto/response.dto'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from 'src/user/user.entity'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UsePipes(new JoiValidationPipe({ bodySchema: AuthValidation.register }))
    async register(@Body() body: RegisterReqDto): Promise<ResponseDto<RegisterResDto>> {
        const response = await this.authService.register(body)
        return {
            data: response,
            message:
                "Your account has been successfully created! Please verify your email by checking on the mail we've sent to your inbox."
        }
    }

    @Post('login')
    async login(@Body() body: LoginReqDto): Promise<ResponseDto<LoginResDto>> {
        const response = await this.authService.login(body)

        return {
            data: response,
            message: 'Login successfull.'
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('confirm')
    async confirm(@Query() query: { code: string }, @Request() req): Promise<ResponseDto<boolean>> {
        return {
            data: await this.authService.confirm(req.user, query.code)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('whoami')
    async whoami(@Request() req): Promise<ResponseDto<UserEntity>> {
        return {
            data: req.user
        }
    }
}
