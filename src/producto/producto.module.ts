import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';

@Module({
  

  imports: [TypeOrmModule.forFeature([Producto, Categoria, Marca])],
  providers: [ProductoService],
  controllers: [ProductoController],
  exports: [TypeOrmModule]
})
export class ProductoModule {}
