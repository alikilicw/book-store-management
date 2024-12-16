import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BookStoreEntity } from './bookstore.entity'
import { AddDeleteBooksToFromBookStoreDto, CreateBookStoreDto, FindBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'
import { BookService } from 'src/book/book.service'

@Injectable()
export class BookStoreService {
    constructor(
        @InjectRepository(BookStoreEntity)
        private readonly bookstoreRepository: Repository<BookStoreEntity>,
        @Inject(forwardRef(() => BookService))
        private readonly bookService: BookService
    ) {}

    async create(createBookStoreDto: CreateBookStoreDto): Promise<BookStoreEntity> {
        const bookStoreCheck = await this.bookstoreRepository.findOne({ where: { name: createBookStoreDto.name } })
        if (bookStoreCheck) throw new BadRequestException('There is a book store with this name.')

        const bookstore = this.bookstoreRepository.create(createBookStoreDto)
        return this.bookstoreRepository.save(bookstore)
    }

    async findAll(): Promise<BookStoreEntity[]> {
        return this.bookstoreRepository.find()
    }

    async find(findBookStoreDto: FindBookStoreDto = {}): Promise<BookStoreEntity[]> {
        return this.bookstoreRepository.find({
            where: findBookStoreDto,
            relations: {
                books: true
            }
        })
    }

    async findOne(bookFindDto: FindBookStoreDto): Promise<BookStoreEntity> {
        const bookStore = await this.bookstoreRepository.findOne({ where: bookFindDto })
        if (!bookStore) throw new NotFoundException('Book store not found.')

        return bookStore
    }

    async findById(id: number): Promise<BookStoreEntity> {
        const bookStore = await this.bookstoreRepository.findOne({ where: { id }, relations: { books: true } })
        if (!bookStore) throw new NotFoundException('Book store not found.')

        return bookStore
    }

    async save(bookStore: BookStoreEntity): Promise<BookStoreEntity> {
        return this.bookstoreRepository.save(bookStore)
    }

    async update(id: number, updateBookStoreDto: UpdateBookStoreDto): Promise<BookStoreEntity> {
        const bookStore = await this.findById(id)
        if (!bookStore) throw new NotFoundException('Book store not found.')

        Object.assign(bookStore, updateBookStoreDto)
        return await this.save(bookStore)
    }

    async delete(id: number): Promise<void> {
        const bookStore = await this.findById(id)
        if (!bookStore) throw new NotFoundException('Book store not found.')

        await this.bookstoreRepository.delete(id)
    }

    async addBooks(id: number, addBooksToBookStoreDto: AddDeleteBooksToFromBookStoreDto): Promise<BookStoreEntity> {
        const bookStore = await this.findById(id)

        const booksToAdd = await this.bookService.find({ ids: addBooksToBookStoreDto.bookIds ?? [] })
        const newBooks = [...bookStore.books, ...booksToAdd]
        bookStore.books = Array.from(new Set(newBooks.map((book) => book.id))).map((id) =>
            newBooks.find((book) => book.id === id)
        )
        return await this.save(bookStore)
    }

    async deleteBooks(id: number, deleteBooksFromBookStoreDto: AddDeleteBooksToFromBookStoreDto): Promise<BookStoreEntity> {
        const bookStore = await this.findById(id)

        const booksToDelete = await this.bookService.find({
            ids: deleteBooksFromBookStoreDto.bookIds ?? []
        })
        bookStore.books = bookStore.books.filter((book) => !booksToDelete.some((bookToDelete) => bookToDelete.id === book.id))
        return await this.save(bookStore)
    }
}
