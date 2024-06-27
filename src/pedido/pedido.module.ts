import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { MetodoPago } from 'src/metodo-pago/metodo-pago.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { MetodoPagoModule } from 'src/metodo-pago/metodo-pago.module';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { PermisoService } from 'src/permiso/permiso.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Usuario, MetodoPago, Permiso, Rol]), // Asegúrate de incluir todas las entidades necesarias
    UsuarioModule,
    MetodoPagoModule
  ],
  providers: [PedidoService, PermisoService],
  controllers: [PedidoController],
  exports: [TypeOrmModule]
})
export class PedidoModule {}

