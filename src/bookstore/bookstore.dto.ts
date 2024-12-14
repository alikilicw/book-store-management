type BookStoreBaseDto = {
    name?: string
}

export type CreateBookStoreDto = Required<BookStoreBaseDto>

export type UpdateBookStoreDto = BookStoreBaseDto

export type FindBookStoreDto = BookStoreBaseDto
