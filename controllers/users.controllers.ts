import {Request, Response} from 'express'
import express from 'express'
import { isAuthUserMiddleware } from '../middlewares/isAuth.middleware'
import { isAdminUserMiddleware } from '../middlewares/isAdmin.middleware'

const router = express.Router()

const controller = {
    login(req:Request,res:Response){

    },
    logout(req:Request,res:Response){

    },
    create(req:Request,res:Response){

    },
    changePassword(req:Request,res:Response){

    },
    delete(req:Request,res:Response){

    },
    checkAuth(req:Request,res:Response){

    },
}

router.get('/check-auth',isAuthUserMiddleware,controller.checkAuth)
router.post('/',isAuthUserMiddleware,isAdminUserMiddleware,controller.create)
router.post('/login',controller.login)
router.post('/logout',controller.logout)
router.put('/change-password/:id',isAuthUserMiddleware,isAdminUserMiddleware,controller.changePassword)
router.delete('/:id',isAuthUserMiddleware,isAdminUserMiddleware,controller.delete)


export default router