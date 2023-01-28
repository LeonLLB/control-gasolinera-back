import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Distribucion } from "./distribucion.entity";


@Entity({name:'clientes'})
export class Cliente{
    @PrimaryGeneratedColumn()
    id!: number

    @Column('text')
    nombre!: string

    @Column('text')
    apellido!: string

    @Column('int8',{unique:true})
    cedula!: number

    @OneToMany(()=>Distribucion,(distribucion)=>distribucion.cliente,{onDelete:'CASCADE'})
    distribuciones!: Distribucion[]
}