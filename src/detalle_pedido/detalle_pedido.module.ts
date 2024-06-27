import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';
import { Detalle_pedido } from './detalle_pedido.entity';
import { Producto } from 'src/producto/producto.entity';
import { Pedido } from 'src/pedido/pedido.entity';
import { Promocion } from 'src/promocion/promocion.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detalle_pedido, Producto, Pedido, Promocion,Usuario, Rol, Permiso])
  ],
  providers: [DetallePedidoService,PermisoService],
  controllers: [DetallePedidoController]
})

export class DetallePedidoModule {}
