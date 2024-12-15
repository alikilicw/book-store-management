import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BookStoreEntity } from './bookstore.entity'
import { CreateBookStoreDto, FindBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'

@Injectable()
export class BookStoreService {
    constructor(
        @InjectRepository(BookStoreEntity)
        private readonly bookstoreRepository: Repository<BookStoreEntity>
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

    async find(findBookStoreDto: FindBookStoreDto): Promise<BookStoreEntity[]> {
        return this.bookstoreRepository.find({
            where: findBookStoreDto
        })
    }

    async findOne(bookFindDto: FindBookStoreDto): Promise<BookStoreEntity> {
        const bookStore = await this.bookstoreRepository.findOne({ where: bookFindDto })
        if (!bookStore) throw new NotFoundException('Book store not found.')

        return bookStore
    }

    async findById(id: number): Promise<BookStoreEntity> {
        const bookStore = await this.bookstoreRepository.findOne({ where: { id } })
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
}
