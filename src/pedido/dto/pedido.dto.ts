import { IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreatePedidoDto{

    @IsNumber()
    @IsNotEmpty()
    id_usuario: number;

    @IsDateString()
    @IsNotEmpty()
    fecha: string; 

    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsString()
    @IsNotEmpty() 
    estado: string;
    
    @IsNumber()
    @IsNotEmpty()
    subtotal: number;
    
    @IsNumber()
    @IsNotEmpty()
    id_metodo_pago: number;

}

