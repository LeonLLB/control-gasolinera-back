import {Request,Response,NextFunction} from 'express'
import { RegistrarDistribucionDto } from '../dto/distribucion/registrar.dto'
import { distribucionRepository } from '../repositories/distribucion.repository'
import { dateService } from '../services/date.service'

export const obtuvoLitrajeMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const body: RegistrarDistribucionDto = req.body
    
    const lastLitraje = await distribucionRepository.findOneBy({
        cliente:{
            cedula:body.cliente.cedula
        }
    })

    if(lastLitraje){
        const ultimaFecha = new Date(lastLitraje.fechaCreacion)
        const fechaActual = await dateService.getVenezuelanDate()

        const diferencia = (fechaActual.getTime() - ultimaFecha.getTime()) / 1000 / 60 / 60 / 24
        
        if(diferencia >= 0.8){
            return next()
        } else {
            const timeDifference = (diferencia*24*(diferencia<1?60:1)).toFixed(0)
            const typeOfTime = diferencia <1? 'minutos':'horas'

            return res.status(403).send({
                message:`Cliente obtuvo litraje hace ${timeDifference} ${typeOfTime}`,
            })
        }
        
    } else {
        return next()
    } 

    
}