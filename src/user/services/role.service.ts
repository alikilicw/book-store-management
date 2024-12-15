import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from '../entities/role.entity'
import { CreateRoleDto, FindRoleDto, UpdateRoleDto } from '../dto/role.dto'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const roleCheck = await this.roleRepository.findOne({ where: { name: createRoleDto.name } })
        if (roleCheck) throw new BadRequestException('There is a role with this name.')

        const role = this.roleRepository.create(createRoleDto)
        return this.roleRepository.save(role)
    }

    async findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find()
    }

    async find(findRoleDto: FindRoleDto): Promise<RoleEntity[]> {
        return this.roleRepository.find({
            where: findRoleDto
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
}
