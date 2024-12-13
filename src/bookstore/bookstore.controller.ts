import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { BookStoreService } from './bookstore.service'
import { CreateBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'

@Controller('bookstores')
export class BookStoreController {
    constructor(private readonly bookstoreService: BookStoreService) {}

    @Post()
    create(@Body() createBookStoreDto: CreateBookStoreDto) {
        return this.bookstoreService.create(createBookStoreDto)
    }

    @Get()
    findAll() {
        return this.bookstoreService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.bookstoreService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookStoreDto: UpdateBookStoreDto) {
        return this.bookstoreService.update(id, updateBookStoreDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.bookstoreService.remove(id)
    }
}
