import {Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { userRepository } from '../repositories/user.repository'
dotenv.config()

export const isAdminUserMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const token: string = req.cookies['x-token']

    if(!token) return res.status(403).json({
        message:'No token'
    })

    const payload = jwt.decode(token) as JwtPayload | null

    if(payload && (payload as JwtPayload).id) {
        const user = await userRepository.findOneBy({id:payload.id})
        if(!user || !user.isAdmin){
            return res.status(403).json({
                message:'Token no valido'
            })
        }

        next()
    }

    return res.status(403).json({
        message:'Token no valido'
    })

}