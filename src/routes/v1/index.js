import express from 'express'
import { userRoute } from '~/routes/v1/userRoute'
import { categoryRoute } from './categoryRoute'
import { bookGenreRoute } from './bookGenreRoute'
import { productRoute } from './productRoute'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs V1 are ready to use.' })
})

// User API
Router.use('/users', userRoute)

Router.use('/categories', categoryRoute)

Router.use('/book-genres', bookGenreRoute)

Router.use('/products', productRoute)

export const APIs_V1 = Router
