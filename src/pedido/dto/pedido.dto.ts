// src/facturas/dto/factura.dto.ts
import { IsNotEmpty, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreatePedidoDto {
    @IsNotEmpty()
    @IsDate()
    fecha: Date;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    total: number;

    @IsOptional()
    @IsNumber()
    id_usuario?: number; // Puedes incluir el id_usuario si se espera que el cliente envíe esta información
}

export class UpdateFacturaDto {
  @IsOptional()
  @IsNumber()
  id_cliente?: number;

  @IsOptional()
  @IsDate()
  fecha_factura?: Date;

  @IsOptional()
  @IsNumber()
  total?: number;
}
