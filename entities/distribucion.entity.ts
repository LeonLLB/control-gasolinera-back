import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'distribuciones'})
export class Distribucion{
    @PrimaryGeneratedColumn()
    id!: number

    @Column('text')
    nombre!: string

    @Column('text')
    apellido!: string

    @Column('int8')
    cedula!: number

    @Column('varchar',{length:8})
    placa!: string

    @Column('text')
    modelo!:string

    @Column('numeric')
    litraje!: number

    @CreateDateColumn()
    createdAt!: Date
}