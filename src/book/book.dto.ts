type BookBaseDto = {
    name?: string
    price?: number
}

export type CreateBookDto = Required<BookBaseDto>

export type UpdateBookDto = BookBaseDto

export type FindBookDto = BookBaseDto & {
    ids?: number[]
}
