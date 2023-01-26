import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
import { AppDataSource } from './db'
import ApiControllers from './controllers'

const origins = [
    'http://172.30.96.1:5173'
]

const server = express()
server.use(cors({
    origin:(origin,cb)=>{
        console.log(origin)
        if(!origin) return cb(null,true)

        if(origins.indexOf(origin)===-1){
            return cb(new Error('CORS no valido'),false)
        }
    },
    credentials:true
}))
server.use(cookieParser())
server.use(express.json())

server.use('/api',ApiControllers)

server.listen(+process.env.PORT!,()=>{
    AppDataSource.initialize().then(()=>{
        console.log('DATABASE OPEN')
        console.log('SERVER RUNNING IN PORT ',process.env.PORT)
    })
})