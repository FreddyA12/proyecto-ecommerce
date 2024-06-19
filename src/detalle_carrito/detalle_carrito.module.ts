import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarritoService } from './detalle_carrito.service';
import { DetalleCarritoController } from './detalle_carrito.controller';
import { DetalleCarrito } from './detalle_carrito.entity';
import { Producto } from '../producto/producto.entity';
import { Carrito } from '../carrito/carrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleCarrito, Producto, Carrito])
  ],
  providers: [DetalleCarritoService],
  controllers: [DetalleCarritoController]
})
export class DetalleCarritoModule {}
