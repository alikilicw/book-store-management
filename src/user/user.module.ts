import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserController } from './controllers/user.controller'
import { AuthModule } from 'src/auth/auth.module'
import { UserService } from './services/user.service'
import { RoleController } from './controllers/role.controller'
import { RoleService } from './services/role.service'
import { RoleEntity } from './entities/role.entity'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), forwardRef(() => AuthModule)],
    controllers: [UserController, RoleController],
    providers: [UserService, RoleService],
    exports: [UserService]
})
export class UserModule {}
