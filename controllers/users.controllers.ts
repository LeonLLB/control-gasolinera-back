import {Request, Response} from 'express'
import express from 'express'
import Redis from 'ioredis'
import dotenv from 'dotenv'
import { isAuthUserMiddleware } from '../middlewares/isAuth.middleware'
import { isAdminUserMiddleware } from '../middlewares/isAdmin.middleware'
import { usersService } from '../services/users.service'

dotenv.config()

const router = express.Router()


const controller = {
    redis: new Redis(process.env.REDIS_URL!),
    async login(req:Request,res:Response){
        return usersService.login(req.body)
            .then(token=>{
                res.cookie('x-token',token)
                return res.status(200).json({
                    success:true
                })
            })
            .catch((err:string)=>{
                const [code,message] = err.split('|')
                return res.status(+code).json({
                    message
                })
            })
    },
    async logout(req:Request,res:Response){
        await this.redis.del(req.cookies['x-token'])
        res.cookie('x-token','')
        return res.status(200).json({
            success:true
        })
    },
    async create(req:Request,res:Response){
        return usersService.create(req.body)
        .then(usuario=>{
            return res.status(200).json({
                success:true,
                data:usuario
            })
        })
        .catch((err:string)=>{
            const [code,message] = err.split('|')
            return res.status(+code).json({
                message
            })
        })
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