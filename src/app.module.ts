import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './common/db/database'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { BookstoreModule } from './bookstore/bookstore.module'
import { BookModule } from './book/book.module'

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(dataSourceOptions), UserModule, BookstoreModule, BookModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
