import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class Usuario{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int8',{unique:true})
    cedula!: number

    @Column('text')
    usuario!: string

    @Column('text')
    password!: string

    @Column('bool',{default:false})
    isAdmin!: boolean
}