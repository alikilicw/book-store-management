import { Controller, Get, Post, Param, Body, NotFoundException, Query, UsePipes, Patch, Delete, UseGuards } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import UserValidation from '../validations/user.validation'
import { ResponseDto } from 'src/common/dto/response.dto'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { UserService } from '../services/user.service'
import { FindUserDto, UpdateUserDto, UserRoleDto } from '../dto/user.dto'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: UserValidation.find }))
    async find(@Query() findUserDto: FindUserDto): Promise<ResponseDto<UserEntity[]>> {
        return {
            data: await this.userService.find(findUserDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id }))
    async findOne(@Param() param: { id: number }): Promise<ResponseDto<UserEntity>> {
        const user = await this.userService.findOne({ id: param.id })
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

    @Patch(':id/roles')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id, bodySchema: UserValidation.userRole }))
    async addRoles(@Param() param: { id: number }, @Body() userRoleDto: UserRoleDto): Promise<ResponseDto<UserEntity>> {
        return {
            data: await this.userService.addRoles(param.id, userRoleDto)
        }
    }

    @Delete(':id/roles')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id, bodySchema: UserValidation.userRole }))
    async deleteRoles(@Param() param: { id: number }, @Body() userRoleDto: UserRoleDto): Promise<ResponseDto<UserEntity>> {
        return {
            data: await this.userService.deleteRoles(param.id, userRoleDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: UserValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        await this.userService.delete(params.id)
    }
}
