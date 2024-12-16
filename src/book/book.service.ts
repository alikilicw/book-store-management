import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { BookEntity } from './book.entity'
import { CreateBookDto, FindBookDto, UpdateBookDto } from './book.dto'
import { BookStoreService } from 'src/bookstore/bookstore.service'

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        @Inject(forwardRef(() => BookStoreService))
        private readonly bookStoreService: BookStoreService
    ) {}

    async create(createBookDto: CreateBookDto): Promise<BookEntity> {
        const bookCheck = await this.bookRepository.findOne({ where: { name: createBookDto.name } })
        if (bookCheck) throw new BadRequestException('There is a book with this name.')

        return this.bookRepository.save(createBookDto)
    }

    async findAll(): Promise<BookEntity[]> {
        return this.bookRepository.find()
    }

    async find(findBookDto: FindBookDto): Promise<BookEntity[]> {
        const { ids, ...filters } = findBookDto

        const query: any = filters
        if (ids) {
            query.id = In(ids)
        }
        return this.bookRepository.find({
            where: query
        })
    }

    async findOne(bookFindDto: FindBookDto): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({ where: bookFindDto })
        if (!book) throw new NotFoundException('Book not found.')

        return book
    }

    async findById(id: number): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({ where: { id } })
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

    async getAvaliableBookStores(id: number) {
        const book = await this.findById(id)

        const bookStores = await this.bookStoreService.find()
        const availableBookStores = bookStores.filter((store) => store.books.some((b) => b.id === book.id))

        return availableBookStores
    }
}
