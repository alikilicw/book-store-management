import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OtpService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(email: string, userId: number, code: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Account Verification',
            context: {
                code
            },
            text: `Please confirm your account.`,
            html: `<p>Please confirm your account with this code:</p>
                   <bold>${code}</bold>`
        })
    }
}
