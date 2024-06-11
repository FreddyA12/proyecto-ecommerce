import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './create-categoria.dto';
import { Categoria } from './categoria.entity';


@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }
}

