import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const validate = async (req, res, next) => {
  const productFields = {
    categoryId: Joi.number().required().integer(),
    name: Joi.string().required().min(3).max(50).trim(),
    price: Joi.number().required().positive(),
    discount: Joi.number().required().min(0).max(100),
    stock: Joi.number().required().integer().min(0),
    description: Joi.string().required().min(5).max(10000).trim(),
    // coverImageUrl: Joi.string().uri().required(),
    dimension: Joi.string().allow('').max(50).trim(),
    type: Joi.string().valid('BOOK', 'STATIONERY').required()

    // productImages: Joi.array()
    //   .items(Joi.object({ imageUrl: Joi.string().uri().required() }))
    //   .min(0)
    //   .max(10)
    //   .unique('imageUrl')
  }
  const bookFields = {
    bookGenreId: Joi.number().required().integer(),
    author: Joi.string().required().max(100).trim(),
    translator: Joi.string().allow('').max(100).trim(),
    language: Joi.string().required().trim(),
    publisher: Joi.string().required().max(100).trim(),
    publishYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    pageCount: Joi.number().integer().min(1)
  }
  const stationeryFields = {
    brand: Joi.string().required().min(1).max(100).trim(),
    placeProduction: Joi.string().required().min(1).max(100).trim(),
    color: Joi.string().allow('').min(1).max(50).trim(),
    material: Joi.string().allow('').min(1).max(50).trim()
  }

  const productSchema = Joi.object({
    ...productFields,
    bookDetail: Joi.alternatives().conditional('type', {
      is: 'BOOK',
      then: Joi.object(bookFields).required(),
      otherwise: Joi.forbidden()
    }),
    stationeryDetail: Joi.alternatives().conditional('type', {
      is: 'STATIONERY',
      then: Joi.object(stationeryFields).required(),
      otherwise: Joi.forbidden()
    })
  })

  try {
    const validated = await productSchema.validateAsync(req.body, {
      convert: true,
      abortEarly: false,
      allowUnknown: false
    })
    req.body = validated
    next()
  } catch (error) {
    next(new ApiError(422, new Error(error).message))
  }
}

export const productValidation = {
  validate
}
