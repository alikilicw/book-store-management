import { forwardRef, Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity } from './book.entity'
import { AuthModule } from 'src/auth/auth.module'
import { CommonModule } from 'src/common/common.module'
import { BookStoreModule } from 'src/bookstore/bookstore.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity]), AuthModule, CommonModule, forwardRef(() => BookStoreModule)],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule {}
