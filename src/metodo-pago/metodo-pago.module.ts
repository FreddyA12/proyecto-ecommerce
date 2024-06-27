import { Module } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPagoController } from './metodo-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPago } from './metodo-pago.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago, Permiso, Usuario,Rol])],
  providers: [MetodoPagoService, PermisoService],
  controllers: [MetodoPagoController],
})
export class MetodoPagoModule {}
