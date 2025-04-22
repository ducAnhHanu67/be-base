import express from 'express'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs V1 are ready to use.' })
})

Router.route('/')
  .get(categoryController.getCategories)
  .post(categoryValidation.validate, categoryController.create)

Router.route('/:id')
  .get(categoryController.getCategoryById)
  .put(categoryValidation.validate, categoryController.update)
  .delete(categoryController.deleteById)

export const categoryRouter = Router
