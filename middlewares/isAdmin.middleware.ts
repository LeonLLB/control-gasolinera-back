import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { userRepository } from '../repositories/user.repository'
import { AuthPayload } from '../interfaces/authPayload'
import Redis from 'ioredis'
dotenv.config()

export const isAdminUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const redis = new Redis(process.env.REDIS_URL!)

    const authUserId: string = req.cookies['token-id']

    if(!authUserId) return res.status(403).json({
        message:'No token'
    })

    const authUserToken = await redis.get(authUserId)

    if(!authUserToken) {
        return res.status(403).json({
            message:'No tiene sesion'
        }) 
    }

    const payload = jwt.decode(authUserToken) as AuthPayload | null

    if(!payload) {

        return res.status(403).json({
            message:'Token no valido'
        })        

    }
    if (payload && payload.isAdmin){
        return next()
    }
    else {
        return res.status(403).json({
            message:'Token no valido'
        })        
    }

}