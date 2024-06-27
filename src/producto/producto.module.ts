import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { PermisoService } from 'src/permiso/permiso.service';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  

  imports: [TypeOrmModule.forFeature([Producto, Categoria, Marca, Permiso, Usuario,Rol])],
  providers: [ProductoService, PermisoService],
  controllers: [ProductoController],
  exports: [TypeOrmModule]
})
export class ProductoModule {}
