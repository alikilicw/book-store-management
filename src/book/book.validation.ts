import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class BookValidation extends BaseValidation {
    public static find = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        price: Joi.number().optional()
    })

    public static create = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        price: Joi.number().required()
    })

    public static update = Joi.object({
        name: Joi.string().min(5).max(20).optional(),
        price: Joi.number().optional()
    })
}
