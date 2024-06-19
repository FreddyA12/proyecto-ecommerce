import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateMenuDTO {
  @IsNotEmpty()
  @IsString()
  nombre_menu: string;

  @IsNotEmpty()
  @IsString()
  ruta: string;

  @IsArray()
  @ArrayNotEmpty()
  rolesIds: number[];
}
