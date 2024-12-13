import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto, UpdateBookDto } from './book.dto'

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto)
    }

    @Get()
    findAll() {
        return this.bookService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.bookService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.bookService.remove(id)
    }
}
