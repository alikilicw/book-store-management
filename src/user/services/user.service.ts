import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { CreateUserDto, FindUserDto, UpdateUserDto, UserRoleDto } from '../dto/user.dto'
import { RoleService } from './role.service'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly roleService: RoleService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const existingUser = await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username: createUserDto.username })
            .orWhere('user.email = :email', { email: createUserDto.email })
            .orWhere('user.phone = :phone', { phone: createUserDto.phone })
            .getOne()

        if (existingUser) {
            if (existingUser.isActive) {
                if (existingUser.username === createUserDto.username) {
                    throw new BadRequestException('Username is already in use.')
                }
                if (existingUser.email === createUserDto.email) {
                    throw new BadRequestException('Email is already in use.')
                }
                if (existingUser.phone === createUserDto.phone) {
                    throw new BadRequestException('Phone is already in use.')
                }
            } else {
                /*
                    This may allow third parties to create accounts
                        with the same username, email, and phone number while creating a user
                */
                this.delete(existingUser.id)
            }
        }
        const { roleIds, ...createUser } = createUserDto
        const newUser = this.userRepository.create(createUser)

        const roles = await this.roleService.find({ ids: roleIds })
        newUser.roles = roles

        return newUser
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async find(findUserDto: FindUserDto): Promise<UserEntity[]> {
        return this.userRepository.find({
            where: findUserDto,
            relations: {
                roles: {
                    permissions: true
                }
            },
            select: {
                roles: {
                    name: true,
                    permissions: {
                        name: true,
                        description: true
                    }
                }
            }
        })
    }

    async findOne(findUserDto: FindUserDto): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: findUserDto,
            relations: {
                roles: true
            }
        })
    }

    async findById(id: number, addSelect?: string): Promise<UserEntity> {
        const query = this.userRepository.createQueryBuilder('user').where('user.id = :id', { id })

        if (addSelect) query.addSelect(`user.${addSelect}`)

        return query.getOne()
    }

    async findByUsername(username: string, addSelect?: string): Promise<UserEntity> {
        const query = this.userRepository.createQueryBuilder('user').where('user.username = :username', { username })

        if (addSelect) query.addSelect(`user.${addSelect}`)

        return query.getOne()
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ email })
    }

    async findByPhone(phone: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ phone })
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(id)
        if (!user) throw new NotFoundException('User not found.')

        Object.assign(user, updateUserDto)
        return this.save(user)
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id)
        if (!user) throw new NotFoundException('User not found.')

        await this.userRepository.delete(id)
    }

    async addRoles(id: number, userRoleDto: UserRoleDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                roles: true
            }
        })
        if (!user) throw new NotFoundException('User not found.')

        const rolesToAdd = await this.roleService.find({ ids: userRoleDto.roleIds })
        const newRoles = [...user.roles, ...rolesToAdd]
        user.roles = Array.from(new Set(newRoles.map((role) => role.id))).map((id) => newRoles.find((role) => role.id === id))
        return await this.save(user)
    }

    async deleteRoles(id: number, userRoleDto: UserRoleDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                roles: true
            }
        })
        if (!user) throw new NotFoundException('User not found.')

        const rolesToDelete = await this.roleService.find({
            ids: userRoleDto.roleIds
        })
        user.roles = user.roles.filter((role) => !rolesToDelete.some((roleToDelete) => roleToDelete.id === role.id))
        return await this.userRepository.save(user)
    }
}
