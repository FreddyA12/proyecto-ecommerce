import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriasController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriasController]
})
export class CategoriaModule {}
