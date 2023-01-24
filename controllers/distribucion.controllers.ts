import {Request, Response} from 'express'
import express from 'express'
import { isAuthUserMiddleware } from '../middlewares/isAuth.middleware'
import { isAdminUserMiddleware } from '../middlewares/isAdmin.middleware'
import { obtuvoLitrajeMiddleware } from '../middlewares/litrajeReciente.middleware'
import { distribucionService } from '../services/distribucion.service'

const router = express.Router()

const controller = {
    async registrar(req:Request,res:Response){
        return distribucionService.registrar(req.body)
            .then(distribucion=>{
                return res.status(200).json({
                    success:true,
                    data:distribucion
                })
            })
            .catch((err:string)=>{
                const [code,message] = err.split('|')
                return res.status(+code).json({
                    message
                })
            })
    },
    async consultar(req:Request,res:Response){
        return distribucionService.consultar()
            .then(distribuciones=>{
                return res.status(200).json(distribuciones)
            })
    },
}

router.post('/',isAuthUserMiddleware,obtuvoLitrajeMiddleware,controller.registrar)
router.get('/',isAuthUserMiddleware,isAdminUserMiddleware,controller.consultar)

export default router