import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { BookStoreEntity } from 'src/bookstore/bookstore.entity'
import { PermissionEntity } from 'src/user/entities/permission.entity'

@Entity('books')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => BookStoreEntity, (bookstore) => bookstore.books)
    bookstores: BookStoreEntity[]

    @Column()
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
