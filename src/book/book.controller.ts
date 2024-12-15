import { Controller, Get, Post, Body, Param, Delete, UsePipes, Query, Patch, UseGuards } from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import BookValidation from './book.validation'
import { ResponseDto } from 'src/common/dto/response.dto'
import { BookEntity } from './book.entity'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: BookValidation.create }))
    async create(@Body() createBookDto: CreateBookDto): Promise<ResponseDto<BookEntity>> {
        return {
            data: await this.bookService.create(createBookDto)
        }
    }

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: BookValidation.find }))
    async find(@Query() findBookDto: FindBookDto): Promise<ResponseDto<BookEntity[]>> {
        return {
            data: await this.bookService.find(findBookDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<BookEntity>> {
        return {
            data: await this.bookService.findById(params.id)
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookValidation.id, bodySchema: BookValidation.update }))
    async update(@Param() params: { id: number }, @Body() updateBookDto: UpdateBookDto): Promise<ResponseDto<BookEntity>> {
        return {
            data: await this.bookService.update(params.id, updateBookDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        return this.bookService.delete(params.id)
    }
}
