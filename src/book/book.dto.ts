type BookBaseDto = {
    name?: string
    bookStoreId?: number
    price?: number
}

export type CreateBookDto = Required<BookBaseDto>

export type UpdateBookDto = BookBaseDto

export type FindBookDto = BookBaseDto
