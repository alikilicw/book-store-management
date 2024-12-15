import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, UsePipes, Patch } from '@nestjs/common'
import { BookStoreService } from './bookstore.service'
import { CreateBookStoreDto, FindBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ResponseDto } from 'src/common/dto/response.dto'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { BookStoreEntity } from './bookstore.entity'
import BookStoreValidation from './bookstore.validation'

@UseGuards(JwtAuthGuard)
@Controller('bookstores')
export class BookStoreController {
    constructor(private readonly bookstoreService: BookStoreService) {}

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: BookStoreValidation.create }))
    async create(@Body() createBookStoreDto: CreateBookStoreDto): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.create(createBookStoreDto)
        }
    }

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: BookStoreValidation.find }))
    async find(@Query() findBookStoreDto: FindBookStoreDto): Promise<ResponseDto<BookStoreEntity[]>> {
        return {
            data: await this.bookstoreService.find(findBookStoreDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.findById(params.id)
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id, bodySchema: BookStoreValidation.update }))
    async update(
        @Param() params: { id: number },
        @Body() updateBookStoreDto: UpdateBookStoreDto
    ): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.update(params.id, updateBookStoreDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        return this.bookstoreService.delete(params.id)
    }
}
