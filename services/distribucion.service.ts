import { AppDataSource } from "../db";
import { RegistrarDistribucionDto } from "../dto/distribucion/registrar.dto";
import { Cliente } from "../entities/cliente.entity";
import { Distribucion } from "../entities/distribucion.entity";
import { distribucionRepository } from "../repositories/distribucion.repository";


class DistribucionService {

    async registrar(dto: RegistrarDistribucionDto){

        if(
            !dto.cliente || !dto.cliente.nombre || !dto.cliente.apellido || !dto.modelo || !dto.placa ||
            !dto.cliente.cedula || !dto.litraje || isNaN(dto.litraje) || isNaN(dto.cliente.cedula)
        ){
            throw new Error("400|Datos invalidos o faltantes");
        }  

        const queryRunner = AppDataSource.createQueryRunner()
        
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            //CREAR O ACTUALIZAR EL CLIENTE
            const cliente = (dto.cliente.id)
            ? await queryRunner.manager.preload(Cliente,{...dto.cliente})
            : queryRunner.manager.create(Cliente,{...dto.cliente})

            const distribucion = queryRunner.manager.create(Distribucion,{...dto,cliente})
            await queryRunner.manager.save(Distribucion,distribucion)
            
            await queryRunner.commitTransaction()
            await queryRunner.release()
            
            return distribucion

        } catch (error) {
            console.error(error)
            await queryRunner.rollbackTransaction()
            await queryRunner.release()
            throw new Error("500|La base de datos no pudo registrar el litraje");
        }


    }

    consultar(){
        return distribucionRepository.find()
    }

}

export const distribucionService = new DistribucionService()