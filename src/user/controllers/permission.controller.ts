import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Patch, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ResponseDto } from 'src/common/dto/response.dto'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { PermissionService } from '../services/permission.service'
import PermissionValidation from '../validations/permission.validation'
import { PermissionEntity, PermissionEnum } from '../entities/permission.entity'
import { CreatePermissionDto, FindPermissionDto, UpdatePermissionDto } from '../dto/permission.dto'
import { PermissionsGuard } from 'src/common/guards/permission.guard'
import { Permissions } from 'src/common/decorators/permission.decorator'

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    @Permissions(PermissionEnum.CREATE_PERMISSION)
    @UsePipes(new JoiValidationPipe({ bodySchema: PermissionValidation.create }))
    async create(@Body() createPermissionDto: CreatePermissionDto): Promise<ResponseDto<PermissionEntity>> {
        return {
            data: await this.permissionService.create(createPermissionDto)
        }
    }

    @Get()
    @Permissions(PermissionEnum.READ_PERMISSION)
    @UsePipes(new JoiValidationPipe({ querySchema: PermissionValidation.find }))
    async find(@Query() findPermissionDto: FindPermissionDto): Promise<ResponseDto<PermissionEntity[]>> {
        return {
            data: await this.permissionService.find(findPermissionDto)
        }
    }

    @Get(':id')
    @Permissions(PermissionEnum.READ_PERMISSION)
    @UsePipes(new JoiValidationPipe({ paramSchema: PermissionValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<PermissionEntity>> {
        return {
            data: await this.permissionService.findById(params.id)
        }
    }

    @Patch(':id')
    @Permissions(PermissionEnum.UPDATE_BOOKSTORE)
    @UsePipes(new JoiValidationPipe({ paramSchema: PermissionValidation.id, bodySchema: PermissionValidation.update }))
    async update(
        @Param() params: { id: number },
        @Body() updatePermissionDto: UpdatePermissionDto
    ): Promise<ResponseDto<PermissionEntity>> {
        return {
            data: await this.permissionService.update(params.id, updatePermissionDto)
        }
    }

    @Delete(':id')
    @Permissions(PermissionEnum.DELETE_PERMISSION)
    @UsePipes(new JoiValidationPipe({ paramSchema: PermissionValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        return this.permissionService.delete(params.id)
    }
}
