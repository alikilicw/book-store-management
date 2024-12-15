type BaseRoleDto = {
    name?: string
}

export type CreateRoleDto = Required<BaseRoleDto>

export type FindRoleDto = BaseRoleDto

export type UpdateRoleDto = BaseRoleDto
