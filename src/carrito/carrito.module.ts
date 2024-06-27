import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { Carrito } from './carrito.entity';
import { Usuario } from '../usuario/usuario.entity'; // Asegúrate de que la ruta es correcta
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { PermisoService } from 'src/permiso/permiso.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, Usuario,Permiso,Rol])],
  providers: [CarritoService, PermisoService],
  exports: [CarritoService], // Exporta el servicio si es necesario en otros módulos
})
export class CarritoModule {}
