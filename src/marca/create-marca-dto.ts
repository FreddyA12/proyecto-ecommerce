// create-categoria.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class createMarcaDTO {
  @IsNotEmpty()
  @IsString()
  nombre: string;
 
  @IsString()
  descripcion: string;
}