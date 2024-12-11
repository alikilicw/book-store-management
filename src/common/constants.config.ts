import { config } from 'dotenv'

config()

type IConstants = {
    DB_HOST: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_NAME: string
    ACCESS_TOKEN_SECRET_KEY: string
    MAIL: string
    MAIL_HOST: string
    MAIL_PORT: string
    MAIL_USER: string
    MAIL_PASS: string
    PORT: string
}

export const Constants: IConstants = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: +process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    MAIL: process.env.MAIL,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    PORT: process.env.PORT
}
