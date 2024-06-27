import { IsInt, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateDetalleCarritoDto {
  @IsInt()
  @IsNotEmpty()
  id_carrito: number;

  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @IsDecimal()
  @IsNotEmpty()
  subtotal: number;

  @IsInt()
  @IsNotEmpty()
  id_producto: number;
}
