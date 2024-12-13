import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity } from './book.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity]), AuthModule],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule {}
