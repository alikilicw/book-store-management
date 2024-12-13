import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BookEntity } from './book.entity'
import { CreateBookDto, UpdateBookDto } from './book.dto'

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async create(createBookDto: CreateBookDto): Promise<BookEntity> {
        const bookCheck = await this.bookRepository.findOne({ where: { name: createBookDto.name } })
        if (bookCheck) throw new BadRequestException('There is a book with this name.')

        const book = this.bookRepository.create(createBookDto)
        return this.bookRepository.save(book)
    }

    async findAll(): Promise<BookEntity[]> {
        return this.bookRepository.find({ relations: { bookstore: true } })
    }

    async findOne(id: number): Promise<BookEntity> {
        return this.bookRepository.findOne({ relations: { bookstore: true }, where: { id } })
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
        await this.bookRepository.update(id, updateBookDto)
        return this.bookRepository.findOne({ relations: { bookstore: true }, where: { id } })
    }

    async remove(id: number): Promise<void> {
        await this.bookRepository.delete(id)
    }
}
