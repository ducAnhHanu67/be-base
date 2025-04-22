import express from 'express'
import { userRoute } from '~/routes/v1/userRoute'
import { categoryRouter } from './categoryRoute'

const Router = express.Router()

// Check API v1/status
Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs V1 are ready to use.' })
})

// User API
Router.use('/users', userRoute)

Router.use('/categories', categoryRouter)

export const APIs_V1 = Router
