import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { Permiso } from './permiso.entity';
import { CreatePermisoDTO } from './create-permiso-dto';

@Controller('permisos')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Post()
  create(@Body() createPermisoDto: CreatePermisoDTO): Promise<Permiso> {
    return this.permisoService.create(createPermisoDto);
  }

  @Get()
  findAll(): Promise<Permiso[]> {
    return this.permisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Permiso> {
    return this.permisoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePermisoDto: CreatePermisoDTO): Promise<Permiso> {
    return this.permisoService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.permisoService.remove(id);
  }
}
