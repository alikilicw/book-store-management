import { Module } from '@nestjs/common'
import { JoiValidationPipe } from './pipes/validation.pipe'
import { UserModule } from 'src/user/user.module'
import { BookStoreModule } from 'src/bookstore/bookstore.module'
import { BookModule } from 'src/book/book.module'
import { PermissionsGuard } from './guards/permission.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
    imports: [UserModule, BookModule, BookStoreModule],
    providers: [JoiValidationPipe, PermissionsGuard, JwtAuthGuard],
    exports: [JoiValidationPipe, PermissionsGuard, JwtAuthGuard]
})
export class AppModule {}
