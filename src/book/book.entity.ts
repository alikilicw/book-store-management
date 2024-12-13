import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BookStoreEntity } from 'src/bookstore/bookstore.entity'

@Entity('books')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => BookStoreEntity)
    @JoinColumn({ name: 'bookstore' })
    bookstore: BookStoreEntity

    @Column()
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
