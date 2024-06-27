import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarritoService } from './detalle_carrito.service';
import { DetalleCarritoController } from './detalle_carrito.controller';
import { DetalleCarrito } from './detalle_carrito.entity';
import { Producto } from '../producto/producto.entity';
import { Carrito } from '../carrito/carrito.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { PermisoService } from 'src/permiso/permiso.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleCarrito, Producto, Carrito, Usuario, Rol, Permiso])
  ],
  providers: [DetalleCarritoService, PermisoService],
  controllers: [DetalleCarritoController]
})
export class DetalleCarritoModule {}
