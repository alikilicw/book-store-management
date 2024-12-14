import * as Joi from 'joi'
import BaseValidation from 'src/common/base.validation'

export default class BookStoreValidation extends BaseValidation {
    private static nameValidation = Joi.object({
        name: Joi.string().min(5).max(20).optional()
    })

    public static find = BookStoreValidation.nameValidation

    public static create = BookStoreValidation.nameValidation

    public static update = BookStoreValidation.nameValidation
}
