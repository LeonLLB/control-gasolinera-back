import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
dotenv.config()
import { AppDataSource } from './db'
import ApiControllers from './controllers'

const server = express()
server.use(cookieParser())
server.use(express.json())

server.use('/api',ApiControllers)

server.listen(+process.env.PORT!,()=>{
    AppDataSource.initialize().then(()=>{
        console.log('DATABASE OPEN')
        console.log('SERVER RUNNING IN PORT ',process.env.PORT)
    })
})