import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import { AppDataSource } from './db'

const server = express()
server.use(cookieParser())
server.use(express.json())

server.listen(+process.env.PORT!,()=>{
    AppDataSource.initialize().then(()=>{
        console.log('DATABASE OPEN')
        console.log('SERVER RUNNING IN PORT ',process.env.PORT)
    })
})