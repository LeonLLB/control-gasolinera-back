import { clienteRepository } from "../repositories/cliente.repository"

class ClienteService {

    async getOne(cedula:number){
        const cliente = await clienteRepository.findOneBy({cedula})

        if(!cliente) throw new Error('404|No existe ese cliente')

        return cliente
    }

}

export const clienteService = new ClienteService()