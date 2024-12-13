import { Module } from '@nestjs/common'
import { JoiValidationPipe } from './pipes/validation.pipe'
import { UserModule } from 'src/user/user.module'
import { BookstoreModule } from 'src/bookstore/bookstore.module'

@Module({
    imports: [UserModule, BookstoreModule],
    providers: [JoiValidationPipe],
    exports: [JoiValidationPipe]
})
export class AppModule {}
