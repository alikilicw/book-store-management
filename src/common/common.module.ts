import { Module } from '@nestjs/common'
import { JoiValidationPipe } from './pipe/validation.pipe'

@Module({
    providers: [JoiValidationPipe],
    exports: [JoiValidationPipe]
})
export class AppModule {}
