import { Module } from '@nestjs/common';
import { TipoIdentificacionService } from './tipo-identificacion.service';
import { TipoIdentificacionController } from './tipo-identificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';
import { Producto } from 'src/producto/producto.entity';
import { TipoIdentificacion } from './tipo-identificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoIdentificacion])],
  providers: [TipoIdentificacionService],
  controllers: [TipoIdentificacionController]
})
export class TipoIdentificacionModule {}
