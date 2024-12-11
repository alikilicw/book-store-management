import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
