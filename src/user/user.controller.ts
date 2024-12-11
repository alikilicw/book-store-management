import { Controller, Get, Post, Param, Body, NotFoundException, Query, UsePipes, Patch, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { FindUserDto, UpdateUserDto } from './user.dto'
import { JoiValidationPipe } from 'src/common/pipe/validation.pipe'
import UserValidation from './user.validation'
import { ResponseDto } from 'src/common/dto/response.dto'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: UserValidation.find }))
    async find(@Query() findUserDto: FindUserDto): Promise<ResponseDto<UserEntity[]>> {
        console.log('AA')

        return {
            data: await this.userService.find(findUserDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id }))
    async findOne(@Param() param: { id: number }): Promise<ResponseDto<UserEntity>> {
        const user = await this.userService.findById(param.id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return {
            data: user
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id, bodySchema: UserValidation.update }))
    async update(@Param() param: { id: number }, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<UserEntity>> {
        return {
            data: await this.userService.update(param.id, updateUserDto)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.userService.delete(id)
    }
}
