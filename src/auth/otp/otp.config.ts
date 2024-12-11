import { MailerOptions } from '@nestjs-modules/mailer'
import { Constants } from 'src/common/constants.config'

export const mailConfig: MailerOptions = {
    transport: {
        host: Constants.MAIL_HOST,
        port: Constants.MAIL_PORT,
        auth: {
            user: Constants.MAIL_USER,
            pass: Constants.MAIL_PASS
        }
    },
    defaults: {
        from: '"NestJS Mailer" ' + Constants.MAIL
    }
}
