import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsOptional()
  id_promocion?: number;

  @IsNumber()
  @IsNotEmpty()
  id_pedido: number;
}
