import { RegistrarDistribucionDto } from "../dto/distribucion/registrar.dto";
import { distribucionRepository } from "../repositories/distribucion.repository";


class DistribucionService {

    async registrar(dto: RegistrarDistribucionDto){

        if(
            !dto.nombre || !dto.apellido || !dto.modelo || !dto.placa ||
            !dto.cedula || !dto.litraje || isNaN(dto.litraje) || isNaN(dto.cedula)
        ){
            throw new Error("400|Datos invalidos o faltantes");
        }  
    
        const distribucion = distribucionRepository.create({...dto})
        await distribucionRepository.save(distribucion)
        return distribucion
    }

    consultar(){
        return distribucionRepository.find()
    }

}

export const distribucionService = new DistribucionService()