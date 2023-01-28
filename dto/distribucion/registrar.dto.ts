

export class RegistrarDistribucionDto{
    cliente!: ClienteDistribucionDto

    placa!: string

    modelo!:string

    litraje!: number
}

export class ClienteDistribucionDto{
    id?:number

    nombre!: string

    apellido!: string

    cedula!: number
}