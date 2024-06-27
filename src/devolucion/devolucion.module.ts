import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolucion } from './devolucion.entity';
import { DevolucionService } from './devolucion.service';
import { DevolucionController } from './devolucion.controller';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ProductoModule } from 'src/producto/producto.module';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Devolucion,Permiso, Usuario,Rol]),
        PedidoModule,
        ProductoModule, // Asegúrate de que PedidoModule esté importado aquí
      ],
      providers: [DevolucionService, PermisoService],
      controllers: [DevolucionController],
})
export class DevolucionModule {}
