import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Redis from 'ioredis'
dotenv.config()

export const isNotAuthUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const redis = new Redis(process.env.REDIS_URL!)

    const signature: string = req.cookies['x-token']

    const restOfToken = await redis.get(signature)

    if(!restOfToken) {
        return next()
    }

    try {
        jwt.verify(`${restOfToken}.${signature}`,process.env.JWT_KEY!)
        return res.status(403).json({
            message:'Usuario tiene sesion activa'
        })
    } catch (error) {
        return next()
    }
}