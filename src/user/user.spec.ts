import { Test, TestingModule } from '@nestjs/testing'
import { UserEntity, Gender } from './user.entity'
import { UserService } from './user.service'
import { Repository } from 'typeorm'

import { getRepositoryToken } from '@nestjs/typeorm'

describe('UserService', () => {
    let service: UserService
    let userRepository: Repository<UserEntity>

    const data: Partial<UserEntity> = {
        id: 25,
        username: 'alikilic',
        email: 'alikilic.w1@gmail.com',
        gender: Gender.MALE,
        phone: '5903u09273',
        isActive: true
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository
                }
            ]
        }).compile()

        service = module.get<UserService>(UserService)
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should return user by id', async () => {
        var data1: Partial<UserEntity> = {
            id: 25,
            username: 'alikilic',
            email: 'alikilic.w1@gmail.com',
            gender: Gender.MALE,
            phone: '5903u09273',
            isActive: true
        }

        jest.spyOn(service, 'findById').mockResolvedValue(data1 as UserEntity)
        expect(await service.findById(1)).toEqual(data1)
    })

    it('should return user by username', async () => {
        jest.spyOn(service, 'findByUsername').mockResolvedValue(data as UserEntity)
        expect(await service.findByUsername('alikilic')).toEqual(data)
    })

    it('should return user by email', async () => {
        jest.spyOn(service, 'findByEmail').mockResolvedValue(data as UserEntity)
        expect(await service.findByEmail('alikilicq')).toEqual(data)
    })
})
