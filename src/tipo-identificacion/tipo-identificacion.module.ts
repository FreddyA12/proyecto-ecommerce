import { Module } from '@nestjs/common';
import { TipoIdentificacionService } from './tipo-identificacion.service';
import { TipoIdentificacionController } from './tipo-identificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';
import { Producto } from 'src/producto/producto.entity';
import { TipoIdentificacion } from './tipo-identificacion.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoIdentificacion, Permiso, Usuario,Rol])],
  providers: [TipoIdentificacionService, PermisoService],
  controllers: [TipoIdentificacionController]
})
export class TipoIdentificacionModule {}
