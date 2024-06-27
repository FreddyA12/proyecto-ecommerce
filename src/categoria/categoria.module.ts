import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriasController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { PermisoService } from 'src/permiso/permiso.service';


@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Permiso, Usuario,Rol])],
  providers: [CategoriaService, PermisoService],
  controllers: [CategoriasController]
})
export class CategoriaModule {}
