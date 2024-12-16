import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { PermissionEntity, PermissionEnum } from '../entities/permission.entity'
import { CreatePermissionDto, FindPermissionDto, UpdatePermissionDto } from '../dto/permission.dto'

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>
    ) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        const permissionCheck = await this.permissionRepository.findOne({ where: { name: createPermissionDto.name } })
        if (permissionCheck) throw new BadRequestException('There is a permission with this name.')

        if (!Object.values(PermissionEnum).some((role) => role == createPermissionDto.name))
            throw new BadRequestException('Please first add this permission into PermissionEnum.')

        const permission = this.permissionRepository.create(createPermissionDto)
        return this.permissionRepository.save(permission)
    }

    async findAll(): Promise<PermissionEntity[]> {
        return this.permissionRepository.find()
    }

    async find(findPermissionDto: FindPermissionDto): Promise<PermissionEntity[]> {
        const { ids, ...filters } = findPermissionDto

        const query: any = filters
        if (ids) {
            query.id = In(ids)
        }

        return this.permissionRepository.find({
            where: query
        })
    }

    async findOne(findPermissionDto: FindPermissionDto): Promise<PermissionEntity> {
        const permission = await this.permissionRepository.findOne({ where: findPermissionDto })
        if (!permission) throw new NotFoundException('Permission not found.')

        return permission
    }

    async findById(id: number): Promise<PermissionEntity> {
        const permission = await this.permissionRepository.findOne({ where: { id } })
        if (!permission) throw new NotFoundException('Permission not found.')

        return permission
    }

    async save(permission: PermissionEntity): Promise<PermissionEntity> {
        return this.permissionRepository.save(permission)
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        const permission = await this.findById(id)
        if (!permission) throw new NotFoundException('Permission not found.')

        Object.assign(permission, updatePermissionDto)
        return await this.save(permission)
    }

    async delete(id: number): Promise<void> {
        const permission = await this.findById(id)
        if (!permission) throw new NotFoundException('Permission not found.')

        await this.permissionRepository.delete(id)
    }
}
