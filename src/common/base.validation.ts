import * as Joi from 'joi'

export default class BaseValidation {
    public static id = Joi.object({
        id: Joi.number().min(0).required()
    })
}
