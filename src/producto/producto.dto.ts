// product.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly nombre: string;

  @IsNumber()
  readonly precio_unitario: number;

  @IsNumber()
  readonly id_categoria: number;

  @IsNumber()
  readonly stock: number;

  @IsString()
  readonly estado: string;

  @IsNumber()
  readonly id_marca: number;

  @IsString()
  readonly descripcion: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsNumber()
  @IsOptional()
  precio_unitario?: number;

  @IsNumber()
  @IsOptional()
  id_categoria?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsNumber()
  @IsOptional()
  id_marca?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
