import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class PermissionValidation extends BaseValidation {
    public static find = Joi.object({
        name: Joi.string().min(5).max(50).optional(),
        description: Joi.string().optional()
    })

    public static create = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().optional()
    })

    public static update = Joi.object({
        name: Joi.string().min(5).max(50).optional(),
        description: Joi.string().optional()
    })
}
