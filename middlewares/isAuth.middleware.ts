import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Redis from 'ioredis'
import { AuthPayload } from '../interfaces/authPayload'
import { userRepository } from '../repositories/user.repository'
dotenv.config()

export const isAuthUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

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

    try {
        const data:AuthPayload = jwt.verify(authUserToken,process.env.JWT_KEY!+authUserId) as AuthPayload

        const userExist = await userRepository.exist({where:{id:data.id}})

        if(!userExist) throw new Error("Usuario no existe");        

    } catch (error) {
        await redis.del(authUserId)
        return res.status(403).json({
            message:error
        })
    }
    return next()
}