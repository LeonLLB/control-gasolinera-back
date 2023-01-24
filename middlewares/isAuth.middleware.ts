import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Redis from 'ioredis'
dotenv.config()

export const isAuthUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const redis = new Redis(process.env.REDIS_URL!)

    const signature: string = req.cookies['x-token']

    if(!signature) return res.status(403).json({
        message:'No token'
    })

    const restOfToken = await redis.get(signature)

    if(!restOfToken) {
        return res.status(403).json({
            message:'No tiene sesion'
        }) 
    }

    try {
        jwt.verify(`${restOfToken}.${signature}`,process.env.JWT_KEY!)
    } catch (error) {
        return res.status(403).json({
            message:'Token no valido o no hay token'
        })
    }
    next()
}