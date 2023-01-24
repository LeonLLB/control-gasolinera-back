import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Redis } from 'ioredis';
import jwt from "jsonwebtoken"
import { CreateUserDto } from '../dto/user/create.dto';
import { LoginDto } from "../dto/user/login.dto";
import { Usuario } from '../entities/user.entity';
import { userRepository } from "../repositories/user.repository";
dotenv.config()

class UsersService {

    redis = new Redis(process.env.REDIS_URL!)

    async login(dto: LoginDto): Promise<string>{

        if(!dto.cedula || !dto.password) throw new Error ('400|Los datos enviados no son validos')

        const user = await userRepository.findOneBy({cedula:dto.cedula})

        if(!user) throw new Error('400|Cedula o clave invalida')

        const isPasswordValid = bcrypt.compareSync(dto.password,user.password)

        if(!isPasswordValid) throw new Error('400|Cedula o clave invalida')

        const [header,body,signature] = jwt.sign({...user,password:undefined},process.env.JWT_KEY!,{expiresIn:'5h'}).split('.')
        this.redis.set(signature,`${header}.${body}`)

        return signature
    }

    async create(dto: CreateUserDto):Promise<Usuario>{
        if(
            !dto.cedula || isNaN(dto.cedula) ||
            !dto.password
        ) {
            throw new Error('400|Datos no validos')
        }

        const password = bcrypt.hashSync(dto.password,15)

        const user = userRepository.create({cedula:dto.cedula,password,isAdmin:dto.isAdmin})
        
        try {
            await userRepository.save(user)        
        } catch (error: any) {
            if(error.code === '23505'){
                throw new Error('400|Usuario existente')
            }
            console.error(error)
            throw new Error('500|Error al crear el usuario')
        }
        return {...user,password:undefined as any}        
    }

    async delete(id: number){
        const user = await userRepository.delete({id})

        if(user.affected === 0){
            throw new Error('404|No existe el usuario') 
        }
    
        return {success:true}
    }

    async changePassword(id:number,dto:{password:string}){
        const password = bcrypt.hashSync(dto.password,15)

        const user = await userRepository.preload({id,password})

        if(!user){
            throw new Error("404|No existe ese usuario");
        }

        await userRepository.save(user)

        return {...user,password:undefined}
    }

    async checkout(signature:string){
        const restOfToken = await this.redis.get(signature)

        if(!restOfToken) throw new Error('400|No session')

        const payload = jwt.decode(`${restOfToken}.${signature}`)

        return payload
    }

}

export const usersService = new UsersService()