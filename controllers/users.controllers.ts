import {Request, Response} from 'express'
import express from 'express'
import Redis from 'ioredis'
import dotenv from 'dotenv'
import { isAuthUserMiddleware } from '../middlewares/isAuth.middleware'
import { isAdminUserMiddleware } from '../middlewares/isAdmin.middleware'
import { usersService } from '../services/users.service'
import { isNotAuthUserMiddleware } from '../middlewares/isNotAuth.middleware'

dotenv.config()

const router = express.Router()


const controller = {
    redis: new Redis(process.env.REDIS_URL!),
    async login(req:Request,res:Response){
        return usersService.login(req.body)
            .then(token=>{
                res.cookie('x-token',token,{httpOnly:true,secure:true})
                return res.status(200).json({
                    success:true
                })
            })
            .catch((err:Error)=>{
                const [code,message] = err.message.split('|')
                return res.status(+code).json({
                    message
                })
            })
    },
    async logout(req:Request,res:Response){
        await this.redis.del(req.cookies['x-token'])
        res.cookie('x-token','',{httpOnly:true,secure:true})
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
        .catch((err:Error)=>{
            const [code,message] = err.message.split('|')
            return res.status(+code).json({
                message
            })
        })
    },
    async changePassword(req:Request,res:Response){
        return usersService.changePassword(+req.params['id'],req.body)
        .then(usuario=>{
            return res.status(200).json({
                success:true,
                data:usuario
            })
        })
        .catch((err:Error)=>{
            const [code,message] = err.message.split('|')
            return res.status(+code).json({
                message
            })
        })
    },
    async delete(req:Request,res:Response){
        return usersService.delete(+req.params['id'])
        .then(usuario=>{
            return res.status(200).json({
                success:true,
                data:usuario
            })
        })
        .catch((err:Error)=>{
            const [code,message] = err.message.split('|')
            return res.status(+code).json({
                message
            })
        })
    },
    async checkAuth(req:Request,res:Response){
        return usersService.checkout(req.params['id'])
        .then(usuario=>{
            return res.status(200).json({
                success:true,
                data:usuario
            })
        })
        .catch((err:Error)=>{
            const [code,message] = err.message.split('|')
            return res.status(+code).json({
                message
            })
        })
    },
}

router.get('/check-auth',isAuthUserMiddleware,controller.checkAuth)
router.post('/',/* isAuthUserMiddleware,isAdminUserMiddleware, */controller.create)
router.post('/login',isNotAuthUserMiddleware,controller.login)
router.post('/logout',controller.logout)
router.put('/change-password/:id',isAuthUserMiddleware,isAdminUserMiddleware,controller.changePassword)
router.delete('/:id',isAuthUserMiddleware,isAdminUserMiddleware,controller.delete)


export default router