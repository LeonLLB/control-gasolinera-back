import express from 'express'
import userController from './users.controllers'
import distribucionController from './distribucion.controllers'
import clienteController from './cliente.controllers'
const router = express.Router()

router.use('/usuarios',userController)
router.use('/distribucion',distribucionController)
router.use('/clientes',clienteController)

export default router