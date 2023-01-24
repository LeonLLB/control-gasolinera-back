import { JwtPayload } from "jsonwebtoken";
import { Usuario } from "../entities/user.entity";


export interface AuthPayload extends JwtPayload,Usuario{

}