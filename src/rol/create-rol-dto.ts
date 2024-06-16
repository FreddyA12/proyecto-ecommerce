import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRolDTO {
  @IsNotEmpty()
  @IsString()
  tipo_rol: string;

  @IsArray()
  @ArrayNotEmpty()
  usuariosIds: number[];
}
