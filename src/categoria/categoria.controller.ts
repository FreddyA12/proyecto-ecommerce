import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './create-categoria.dto';
import { Categoria } from './categoria.entity';
import { ApiTags } from '@nestjs/swagger';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Categorias')
@Controller('categorias')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriaService) {}

  
  @Post()
  @ModuleAccess('CATEGORIAS')
  @Permissions('CREARPRIVILEGIADO')
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ModuleAccess('CATEGORIAS')
  @Permissions('VISUALIZARPRIVILEGIADO','VISUALIZAR')
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ModuleAccess('CATEGORIAS')
  @Permissions('VISUALIZARPRIVILEGIADO','VISUALIZAR')
  findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Put(':id')
  @ModuleAccess('CATEGORIAS')
  @Permissions('EDITARRPRIVILEGIADO')
  update(@Param('id') id: number, @Body() updateCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ModuleAccess('CATEGORIAS')
  @Permissions('ELIMINARPRIVILEGIADO')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }
}

