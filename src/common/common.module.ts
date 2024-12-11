import { Module } from '@nestjs/common'
import { JoiValidationPipe } from './pipes/validation.pipe'

@Module({
    providers: [JoiValidationPipe],
    exports: [JoiValidationPipe]
})
export class AppModule {}
