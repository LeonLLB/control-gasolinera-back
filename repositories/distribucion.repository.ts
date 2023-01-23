import { AppDataSource } from "../db";
import { Distribucion } from "../entities/distribucion.entity";


export const distribucionRepository = AppDataSource.getRepository(Distribucion)