import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class DevolucionDto{

    @IsNumber()
    @IsNotEmpty()
    id_pedido: number;

    @IsString()
    @IsNotEmpty() 
    motivo: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @IsNumber()
    @IsNotEmpty()
    id_producto: number;

    @IsDateString()
    @IsNotEmpty()
    fecha_devolucion: string; 

}