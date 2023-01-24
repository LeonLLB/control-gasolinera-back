import express from 'express'
import userController from './users.controllers'
import distribucionController from './distribucion.controllers'
const router = express.Router()

router.use('/usuarios',userController)
router.use('/distribucion',distribucionController)

export default router