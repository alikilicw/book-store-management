import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './common/db/database'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { BookstoreModule } from './bookstore/bookstore.module'

@Module({
    imports: [AuthModule, TypeOrmModule.forRoot(dataSourceOptions), UserModule, BookstoreModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
