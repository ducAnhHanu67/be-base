import express from 'express'
import { brandsController } from '~/controllers/brandsController'

const Router = express.Router()

Router.route('/')
  .get(brandsController.getBrands)
  .post(brandsController.create)

Router.route('/:id')
  .put(brandsController.update)
  .delete(brandsController.deleteById)

Router.route('/category/:categoryId')
  .get(brandsController.getBrandsByCategory)

export const brandsRoute = Router
