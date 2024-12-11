import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'
import { Gender, UserRole } from './user.entity'

export default class UserValidation extends BaseValidation {
    public static find = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        role: Joi.string()
            .valid(...Object.values(UserRole))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })

    public static update = Joi.object({
        username: Joi.string().min(5).max(20).optional(),
        email: Joi.string().email().optional(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .optional(),
        role: Joi.string()
            .valid(...Object.values(UserRole))
            .optional(),
        phone: Joi.string().min(5).max(20).optional()
    })
}
