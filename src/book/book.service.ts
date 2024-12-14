import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BookEntity } from './book.entity'
import { CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto'
import { BookStoreService } from 'src/bookstore/bookstore.service'

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        private readonly bookStoreService: BookStoreService
    ) {}

    async create(createBookDto: CreateBookDto): Promise<BookEntity> {
        const bookCheck = await this.bookRepository.findOne({ where: { name: createBookDto.name } })
        if (bookCheck) throw new BadRequestException('There is a book with this name.')

        const bookStore = await this.bookStoreService.findById(createBookDto.bookStoreId)

        const book = this.bookRepository.create(createBookDto)
        book.bookstore = bookStore

        return this.bookRepository.save(book)
    }

    async findAll(): Promise<BookEntity[]> {
        return this.bookRepository.find()
    }

    async find(findBookDto: FindBookDto): Promise<BookEntity[]> {
        return this.bookRepository.find({
            where: findBookDto,
            relations: {
                bookstore: true
            }
        })
    }

    async findOne(bookFindDto: FindBookDto): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({ where: bookFindDto, relations: { bookstore: true } })
        if (!book) throw new NotFoundException('Book not found.')

        return book
    }

    async findById(id: number): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: { bookstore: true } })
        if (!book) throw new NotFoundException('Book not found.')

        return book
    }

    async save(book: BookEntity): Promise<BookEntity> {
        return this.bookRepository.save(book)
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
        const book = await this.findById(id)
        if (!book) throw new NotFoundException('Book not found.')

        Object.assign(book, updateBookDto)
        return await this.save(book)
    }

    async delete(id: number): Promise<void> {
        const book = await this.findById(id)
        if (!book) throw new NotFoundException('Book not found.')

        await this.bookRepository.delete(id)
    }
}
