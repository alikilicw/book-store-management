export type CreateBookDto = {
    name: string
    bookStore: number
    price: number
}

export type UpdateBookDto = {
    name?: string
    bookStore?: number
    price?: number
}
