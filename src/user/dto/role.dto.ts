type BaseRoleDto = {
    name?: string
}

export type CreateRoleDto = Required<BaseRoleDto> & {
    permissionIds?: number[]
}

export type FindRoleDto = BaseRoleDto

export type UpdateRoleDto = BaseRoleDto

export type RolePermissionDto = {
    permissionIds?: number[]
}
