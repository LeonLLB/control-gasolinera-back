import {Request,Response,NextFunction} from 'express'
import { distribucionRepository } from '../repositories/distribucion.repository'

export const obtuvoLitrajeMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const body = req.body
    
    const lastLitraje = await distribucionRepository.findOneBy({cedula:body.cedula})

    if(lastLitraje){
        const ultimaFecha = new Date(lastLitraje.createdAt)
        const fechaActual = new Date()

        const diferencia = (fechaActual.getTime() - ultimaFecha.getTime()) / 1000 / 60 / 60 / 24
        
        if(diferencia >= 0.8){
            return next()
        } else {
            return res.status(403).send({
                message:`Cliente obtuvo litraje hace ${(diferencia*24).toFixed(0)} horas`
            })
        }
        
    } else {
        return next()
    } 

    
}