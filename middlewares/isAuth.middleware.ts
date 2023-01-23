import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const isAuthUserMiddleware = (req:Request,res:Response,next:NextFunction) => {

    const token: string = req.cookies['x-token']

    try {
        if(!token) throw  new Error()
        jwt.verify(token,process.env.JWT_KEY!)
        next()
    } catch (error) {
        return res.status(403).json({
            message:'Token no valido o no hay token'
        })
    }
}