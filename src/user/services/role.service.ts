import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { RoleEntity, RoleEnum } from '../entities/role.entity'
import { CreateRoleDto, FindRoleDto, RolePermissionDto, UpdateRoleDto } from '../dto/role.dto'
import { PermissionService } from './permission.service'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly permissionService: PermissionService
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const roleCheck = await this.roleRepository.findOne({ where: { name: createRoleDto.name } })
        if (roleCheck) throw new BadRequestException('There is a role with this name.')

        if (!Object.values(RoleEnum).some((role) => role == createRoleDto.name))
            throw new BadRequestException('Please first add this role into RoleEnum.')

        const permissions = await this.permissionService.find({ ids: createRoleDto.permissionIds })

        const role = this.roleRepository.create(createRoleDto)
        role.permissions = permissions
        return this.roleRepository.save(role)
    }

    async findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find()
    }

    async find(findRoleDto: FindRoleDto): Promise<RoleEntity[]> {
        return this.roleRepository.find({
            where: findRoleDto,
            relations: {
                permissions: true
            },
            select: {
                permissions: {
                    id: true,
                    name: true,
                    description: true
                }
            }
        })
    }

    async findOne(findRoleDto: FindRoleDto): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: findRoleDto })
        if (!role) throw new NotFoundException('Role not found.')

        return role
    }

    async findById(id: number): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: { id } })
        if (!role) throw new NotFoundException('Role not found.')

        return role
    }

    async save(role: RoleEntity): Promise<RoleEntity> {
        return this.roleRepository.save(role)
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        const role = await this.findById(id)
        if (!role) throw new NotFoundException('Role not found.')

        Object.assign(role, updateRoleDto)
        return await this.save(role)
    }

    async delete(id: number): Promise<void> {
        const role = await this.findById(id)
        if (!role) throw new NotFoundException('Role not found.')

        await this.roleRepository.delete(id)
    }

    async addPermissions(id: number, rolePermissionDto: RolePermissionDto): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: {
                permissions: true
            }
        })
        if (!role) throw new NotFoundException('Role not found.')

        const permissionsToAdd = await this.permissionService.find({ ids: rolePermissionDto.permissionIds })
        const newPermissions = [...role.permissions, ...permissionsToAdd]
        role.permissions = Array.from(new Set(newPermissions.map((permission) => permission.id))).map((id) =>
            newPermissions.find((permission) => permission.id === id)
        )
        await this.save(role)
        return role
    }

    async deletePermissions(id: number, rolePermissionDto: RolePermissionDto): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: {
                permissions: true
            }
        })
        if (!role) throw new NotFoundException('Role not found.')

        const permissionsToDelete = await this.permissionService.find({
            ids: rolePermissionDto.permissionIds
        })
        role.permissions = role.permissions.filter(
            (permission) => !permissionsToDelete.some((permissionToDelete) => permissionToDelete.id === permission.id)
        )
        await this.roleRepository.save(role)
        return role
    }
}
