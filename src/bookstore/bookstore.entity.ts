import { BookEntity } from 'src/book/book.entity'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('bookstores')
export class BookStoreEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => BookEntity, (book) => book.bookstores, { eager: false })
    @JoinTable({
        name: 'bookstore_books'
    })
    books: BookEntity[]
}
