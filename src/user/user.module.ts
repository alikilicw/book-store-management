import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserController } from './controllers/user.controller'
import { AuthModule } from 'src/auth/auth.module'
import { UserService } from './services/user.service'
import { RoleController } from './controllers/role.controller'
import { RoleService } from './services/role.service'
import { RoleEntity } from './entities/role.entity'
import { PermissionController } from './controllers/permission.controller'
import { PermissionService } from './services/permission.service'
import { PermissionEntity } from './entities/permission.entity'
import { CommonModule } from 'src/common/common.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]), forwardRef(() => AuthModule), CommonModule],
    controllers: [UserController, RoleController, PermissionController],
    providers: [UserService, RoleService, PermissionService],
    exports: [UserService, PermissionService, RoleService]
})
export class UserModule {}
