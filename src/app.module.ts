import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { BookStoreModule } from './bookstore/bookstore.module'
import { BookModule } from './book/book.module'
import { CommonModule } from './common/common.module'
import { Constants } from './common/constants.config'
import { UserEntity } from './user/entities/user.entity'
import { BookEntity } from './book/book.entity'
import { BookStoreEntity } from './bookstore/bookstore.entity'
import { PermissionEntity } from './user/entities/permission.entity'
import { RoleEntity } from './user/entities/role.entity'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: Constants.DB_HOST,
                port: Constants.DB_PORT,
                username: Constants.DB_USERNAME,
                password: Constants.DB_PASSWORD,
                database: Constants.DB_NAME,
                entities: [UserEntity, BookEntity, BookStoreEntity, RoleEntity, PermissionEntity],
                synchronize: true
            })
        }),
        AuthModule,
        UserModule,
        BookStoreModule,
        BookModule,
        CommonModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
