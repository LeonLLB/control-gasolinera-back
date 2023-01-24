import express from 'express'
import userController from './users.controllers'
const router = express.Router()

router.use('/usuarios',userController)

export default router