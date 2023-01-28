import {Request, Response} from 'express'
import express from 'express'
import { isAuthUserMiddleware } from '../middlewares/isAuth.middleware'
import { clienteService } from '../services/cliente.service'

const router = express.Router()

const controller = {
    getOne(req:Request,res:Response){
        return clienteService.getOne(+req.params['cliente'])
        .then(cliente=>{
            return res.status(200).json({
                success:true,
                data:cliente
            })
        })
        .catch((err:Error)=>{
            const [code,message] = err.message.split('|')
            return res.status(+code).json({
                message
            })
        })
    }
}

router.get('/:id',isAuthUserMiddleware,controller.getOne)

export default router