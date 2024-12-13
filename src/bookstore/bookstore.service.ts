import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BookStoreEntity } from './bookstore.entity'
import { CreateBookStoreDto, UpdateBookStoreDto } from './bookstore.dto'

@Injectable()
export class BookStoreService {
    constructor(
        @InjectRepository(BookStoreEntity)
        private readonly bookstoreRepository: Repository<BookStoreEntity>
    ) {}

    async create(createBookStoreDto: CreateBookStoreDto): Promise<BookStoreEntity> {
        const bookstore = this.bookstoreRepository.create(createBookStoreDto)
        return this.bookstoreRepository.save(bookstore)
    }

    async findAll(): Promise<BookStoreEntity[]> {
        return this.bookstoreRepository.find()
    }

    async findOne(id: number): Promise<BookStoreEntity> {
        return this.bookstoreRepository.findOne({ where: { id } })
    }

    async update(id: number, updateBookStoreDto: UpdateBookStoreDto): Promise<BookStoreEntity> {
        await this.bookstoreRepository.update(id, updateBookStoreDto)
        return this.bookstoreRepository.findOne({ where: { id } })
    }

    async remove(id: number): Promise<void> {
        await this.bookstoreRepository.delete(id)
    }
}
