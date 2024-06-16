import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CarritoDto{
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsString()
    @IsNotEmpty()
    estado:string;

    @IsNumber()
    @IsNotEmpty()
    id_usuario: number;

}