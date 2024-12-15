import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from 'src/user/user.entity'
import { ROLES_KEY } from '../decorators/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        if (!requiredRoles) {
            return true
        }

        if (requiredRoles.some((role) => role == UserRole.USER)) return true

        const request = context.switchToHttp().getRequest()
        if (!request.user) return true

        return requiredRoles.some((role) => request.user.role.some((role_) => role_ == role))
    }
}
