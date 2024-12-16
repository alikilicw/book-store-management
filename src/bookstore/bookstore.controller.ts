import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, UsePipes, Patch } from '@nestjs/common'
import { BookStoreService } from './bookstore.service'
import { AddDeleteBooksToFromBookStoreDto, CreateBookStoreDto, FindBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ResponseDto } from 'src/common/dto/response.dto'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { BookStoreEntity } from './bookstore.entity'
import BookStoreValidation from './bookstore.validation'
import { Permissions } from 'src/common/decorators/permission.decorator'
import { PermissionEnum } from 'src/user/entities/permission.entity'
import { PermissionsGuard } from 'src/common/guards/permission.guard'

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('bookstores')
export class BookStoreController {
    constructor(private readonly bookstoreService: BookStoreService) {}

    @Post()
    @Permissions(PermissionEnum.CREATE_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ bodySchema: BookStoreValidation.create }))
    async create(@Body() createBookStoreDto: CreateBookStoreDto): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.create(createBookStoreDto)
        }
    }

    @Get()
    @Permissions(PermissionEnum.READ_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ querySchema: BookStoreValidation.find }))
    async find(@Query() findBookStoreDto: FindBookStoreDto): Promise<ResponseDto<BookStoreEntity[]>> {
        return {
            data: await this.bookstoreService.find(findBookStoreDto)
        }
    }

    @Get(':id')
    @Permissions(PermissionEnum.READ_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.findById(params.id)
        }
    }

    @Patch(':id')
    @Permissions(PermissionEnum.UPDATE_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id, bodySchema: BookStoreValidation.update }))
    async update(
        @Param() params: { id: number },
        @Body() updateBookStoreDto: UpdateBookStoreDto
    ): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.update(params.id, updateBookStoreDto)
        }
    }

    @Patch(':id/books')
    @Permissions(PermissionEnum.ADD_BOOK_TO_BOOKSTORE)
    @UsePipes(
        new JoiValidationPipe({ paramSchema: BookStoreValidation.id, bodySchema: BookStoreValidation.addDeleteToFromBookStore })
    )
    async addBooks(
        @Param() params: { id: number },
        @Body() addBooksToBookStoreDto: AddDeleteBooksToFromBookStoreDto
    ): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.addBooks(params.id, addBooksToBookStoreDto)
        }
    }

    @Delete(':id/books')
    @Permissions(PermissionEnum.ADD_BOOK_TO_BOOKSTORE)
    @UsePipes(
        new JoiValidationPipe({ paramSchema: BookStoreValidation.id, bodySchema: BookStoreValidation.addDeleteToFromBookStore })
    )
    async deleteBooks(
        @Param() params: { id: number },
        @Body() deleteBooksFromBookStoreDto: AddDeleteBooksToFromBookStoreDto
    ): Promise<ResponseDto<BookStoreEntity>> {
        return {
            data: await this.bookstoreService.deleteBooks(params.id, deleteBooksFromBookStoreDto)
        }
    }

    @Delete(':id')
    @Permissions(PermissionEnum.DELETE_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ paramSchema: BookStoreValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        return this.bookstoreService.delete(params.id)
    }
}
