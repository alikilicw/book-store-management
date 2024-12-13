import { UserEntity } from 'src/user/user.entity'
import { Constants } from '../constants.config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { BookStoreEntity } from 'src/bookstore/bookstore.entity'
import { BookEntity } from 'src/book/book.entity'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: Constants.DB_HOST,
    port: Constants.DB_PORT,
    username: Constants.DB_USERNAME,
    password: Constants.DB_PASSWORD,
    database: Constants.DB_NAME,
    entities: [UserEntity, BookStoreEntity, BookEntity],
    synchronize: true
}

export const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()
