import { forwardRef, Module } from '@nestjs/common'
import { BookStoreController } from './bookstore.controller'
import { BookStoreService } from './bookstore.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookStoreEntity } from './bookstore.entity'
import { AuthModule } from 'src/auth/auth.module'
import { CommonModule } from 'src/common/common.module'
import { BookModule } from 'src/book/book.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookStoreEntity]), AuthModule, CommonModule, forwardRef(() => BookModule)],
    controllers: [BookStoreController],
    providers: [BookStoreService],
    exports: [BookStoreService]
})
export class BookStoreModule {}
