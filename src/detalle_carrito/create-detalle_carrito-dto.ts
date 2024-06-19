import { IsInt, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateDetalleCarritoDTO {
  @IsNotEmpty()
  @IsInt()
  id_carrito: number;

  @IsNotEmpty()
  @IsInt()
  cantidad: number;

  @IsNotEmpty()
  @IsDecimal()
  subtotal: number;

  @IsNotEmpty()
  @IsInt()
  id_producto: number;
}
