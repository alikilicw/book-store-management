import { Module } from '@nestjs/common'
import { PermissionsGuard } from './guards/permission.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
    providers: [PermissionsGuard, JwtAuthGuard],
    exports: [PermissionsGuard, JwtAuthGuard]
})
export class CommonModule {}
