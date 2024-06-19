import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';
import { CreateRolDTO } from './create-rol-dto';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDTO): Promise<Rol> {
    return this.rolService.create(createRolDto);
  }

  @Get()
  findAll(): Promise<Rol[]> {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rol> {
    return this.rolService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRolDto: CreateRolDTO): Promise<Rol> {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rolService.remove(id);
  }
}
