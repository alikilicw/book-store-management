import { Module } from '@nestjs/common'
import { JoiValidationPipe } from './pipes/validation.pipe'
import { UserModule } from 'src/user/user.module'
import { BookstoreModule } from 'src/bookstore/bookstore.module'
import { BookModule } from 'src/book/book.module'
import { RolesGuard } from './guards/roles.guard'

@Module({
    imports: [UserModule, BookstoreModule, BookModule],
    providers: [JoiValidationPipe],
    exports: [JoiValidationPipe, RolesGuard]
})
export class AppModule {}
