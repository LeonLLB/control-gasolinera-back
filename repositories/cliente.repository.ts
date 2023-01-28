import { AppDataSource } from "../db";
import { Cliente } from "../entities/cliente.entity";


export const clienteRepository = AppDataSource.getRepository(Cliente)