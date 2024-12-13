import { Module } from '@nestjs/common'
import { BookStoreController } from './bookstore.controller'
import { BookStoreService } from './bookstore.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookStoreEntity } from './bookstore.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookStoreEntity]), AuthModule],
    controllers: [BookStoreController],
    providers: [BookStoreService]
})
export class BookstoreModule {}
