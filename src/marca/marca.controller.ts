import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { Marca } from './marca.entity';
import { createMarcaDTO } from './create-marca-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Marcas')
@Controller('marcas')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class MarcaController {
  constructor(
    private readonly marcaService: MarcaService
  ) {}

  @Post()
  @ModuleAccess('MARCAS')
  @Permissions('CREARPRIVILEGIADO')
  async create(@Request() req, @Body() createMarcaDto: createMarcaDTO): Promise<Marca> {
    return this.marcaService.create(createMarcaDto);
  }


  @Get()
  @ModuleAccess('MARCAS')
  @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
  async findAll(@Request() req): Promise<Marca[]> {
    return this.marcaService.findAll();
  }

  @Get(':id')
  @ModuleAccess('MARCAS')
  @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
  async findOne(@Request() req, @Param('id') id: number): Promise<Marca> {
    return this.marcaService.findOne(id);
  }

  @Put(':id')
  @ModuleAccess('MARCAS')
  @Permissions('EDITARPRIVILEGIADO')
  async update(@Request() req, @Param('id') id: number, @Body() updateMarcaDto: createMarcaDTO): Promise<Marca> {
    return this.marcaService.update(id, updateMarcaDto);
  }

  @Delete(':id')
  @ModuleAccess('MARCAS')
  @Permissions('ELIMINARPRIVILEGIADO')
  async remove(@Request() req, @Param('id') id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
  
}
