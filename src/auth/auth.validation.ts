import * as Joi from 'joi'
import { Gender, UserRole } from 'src/user/user.entity'

export default class AuthValidation {
    public static register = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().required(),
        gender: Joi.string()
            .valid(...Object.values(Gender))
            .required(),
        phone: Joi.string().min(5).max(20).required(),
        role: Joi.array()
            .items(Joi.string().valid(...Object.values(UserRole)))
            .required(),
        password: Joi.string().min(5).max(20).required()
    })

    public static login = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(20).required()
    })
}
