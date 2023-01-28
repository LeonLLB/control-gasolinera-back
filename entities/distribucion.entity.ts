import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";

@Entity({name:'distribuciones'})
export class Distribucion{
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar',{length:8})
    placa!: string

    @Column('text')
    modelo!:string

    @Column('numeric')
    litraje!: number

    @Column('timestamp')
    fechaCreacion!: Date

    @ManyToOne(()=>Cliente,(cliente)=>cliente.distribuciones,{eager:true,cascade:true,onDelete:'CASCADE'})
    cliente!: Cliente
}