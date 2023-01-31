import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Redis from 'ioredis'
dotenv.config()

export const isNotAuthUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const redis = new Redis(process.env.REDIS_URL!)

    const authUserId: string = req.cookies['token-id']

    const dataToken = await redis.get(authUserId)

    if(!dataToken) {
        return next()
    }

    try {
        jwt.verify(dataToken,process.env.JWT_KEY!+authUserId)
        return res.status(403).json({
            message:'Usuario tiene sesion activa'
        })
    } catch (error) {
        await redis.del(authUserId)
        return next()
    }
}