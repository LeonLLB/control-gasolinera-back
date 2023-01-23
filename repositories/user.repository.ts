import { AppDataSource } from "../db";
import { Usuario } from "../entities/user.entity";


export const userRepository = AppDataSource.getRepository(Usuario)