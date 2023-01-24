import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Redis from 'ioredis'
import { AuthPayload } from '../interfaces/authPayload'
import { userRepository } from '../repositories/user.repository'
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
        const data:AuthPayload = jwt.verify(`${restOfToken}.${signature}`,process.env.JWT_KEY!) as AuthPayload

        const userExist = await userRepository.exist({where:{id:data.id}})

        if(!userExist) throw new Error("Usuario no existe");        

    } catch (error) {
        await redis.del(signature)
        return res.status(403).json({
            message:error
        })
    }
    next()
}