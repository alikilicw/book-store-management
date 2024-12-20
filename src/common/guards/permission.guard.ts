import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PermissionEntity, PermissionEnum } from 'src/user/entities/permission.entity'
import { RoleEntity } from 'src/user/entities/role.entity'

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<PermissionEnum[]>('permissions', context.getHandler())
        if (!requiredPermissions) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        const userPermissions = user.roles.flatMap((role: RoleEntity) =>
            role.permissions.map((perm: PermissionEntity) => perm.name)
        )

        const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm))

        if (!hasPermission) {
            throw new ForbiddenException('You do not have the required permissions')
        }

        return true
    }
}
