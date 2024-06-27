import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { PermisoService } from 'src/permiso/permiso.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Permiso, Rol])],
  providers: [UsuarioService, PermisoService],
  controllers: [UsuarioController],
  exports: [UsuarioService, TypeOrmModule.forFeature([Usuario])] // Exporta TypeOrmModule aquí
})
export class UsuarioModule {}



