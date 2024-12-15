import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity } from './book.entity'
import { AuthModule } from 'src/auth/auth.module'
import { BookStoreModule } from 'src/bookstore/bookstore.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity]), AuthModule, BookStoreModule],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule {}
