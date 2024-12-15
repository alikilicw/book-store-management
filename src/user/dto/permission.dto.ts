type BasePermissionDto = {
    name?: string
    description?: string
}

export type CreatePermissionDto = BasePermissionDto & {
    name: string
}

export type FindPermissionDto = BasePermissionDto

export type UpdatePermissionDto = BasePermissionDto
