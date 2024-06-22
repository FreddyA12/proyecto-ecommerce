import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from './marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoModule } from 'src/permiso/permiso.module';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marca, Permiso,Rol, Usuario])],
  providers: [MarcaService, PermisoService],
  controllers: [MarcaController],
  exports: [PermisoService],
})
export class MarcaModule {}
