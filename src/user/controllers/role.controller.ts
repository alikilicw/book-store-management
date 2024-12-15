import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Patch, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ResponseDto } from 'src/common/dto/response.dto'
import { RoleService } from '../services/role.service'
import { CreateRoleDto, FindRoleDto, RolePermissionDto, UpdateRoleDto } from '../dto/role.dto'
import { RoleEntity } from '../entities/role.entity'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import RoleValidation from '../validations/role.validation'

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @UsePipes(new JoiValidationPipe({ bodySchema: RoleValidation.create }))
    async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseDto<RoleEntity>> {
        return {
            data: await this.roleService.create(createRoleDto)
        }
    }

    @Get()
    @UsePipes(new JoiValidationPipe({ querySchema: RoleValidation.find }))
    async find(@Query() findRoleDto: FindRoleDto): Promise<ResponseDto<RoleEntity[]>> {
        return {
            data: await this.roleService.find(findRoleDto)
        }
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: RoleValidation.id }))
    async findOne(@Param() params: { id: number }): Promise<ResponseDto<RoleEntity>> {
        return {
            data: await this.roleService.findById(params.id)
        }
    }

    @Patch(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: RoleValidation.id, bodySchema: RoleValidation.update }))
    async update(@Param() params: { id: number }, @Body() updateRoleDto: UpdateRoleDto): Promise<ResponseDto<RoleEntity>> {
        return {
            data: await this.roleService.update(params.id, updateRoleDto)
        }
    }

    @Patch(':id/permissions')
    @UsePipes(new JoiValidationPipe({ paramSchema: RoleValidation.id, bodySchema: RoleValidation.rolePermission }))
    async addPermissions(
        @Param() params: { id: number },
        @Body() rolePermissionDto: RolePermissionDto
    ): Promise<ResponseDto<RoleEntity>> {
        return {
            data: await this.roleService.addPermissions(params.id, rolePermissionDto)
        }
    }

    @Delete(':id/permissions')
    @UsePipes(new JoiValidationPipe({ paramSchema: RoleValidation.id, bodySchema: RoleValidation.rolePermission }))
    async deletePermissions(
        @Param() params: { id: number },
        @Body() rolePermissionDto: RolePermissionDto
    ): Promise<ResponseDto<RoleEntity>> {
        return {
            data: await this.roleService.deletePermissions(params.id, rolePermissionDto)
        }
    }

    @Delete(':id')
    @UsePipes(new JoiValidationPipe({ paramSchema: RoleValidation.id }))
    async delete(@Param() params: { id: number }): Promise<void> {
        return this.roleService.delete(params.id)
    }
}
