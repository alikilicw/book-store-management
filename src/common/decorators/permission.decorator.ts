import { SetMetadata } from '@nestjs/common'
import { PermissionEnum } from 'src/user/entities/permission.entity'

export const Permissions = (...permissions: PermissionEnum[]) => SetMetadata('permissions', permissions)
