import { DataSource } from "typeorm";
import { Distribucion } from "./entities/distribucion.entity";
import { Usuario } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type:'postgres',
    url:process.env.DB_URL,
    synchronize:true,
    entities:[
        Usuario,
        Distribucion
    ]
})