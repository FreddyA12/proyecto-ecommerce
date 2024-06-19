import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { Marca } from './marca.entity';
import { createMarcaDTO } from './create-marca-dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Marcas')
@Controller('marcas')
export class MarcaController {
    constructor(private readonly marcaService: MarcaService) {}
    
  @Post()
  create(@Body() createCategoriaDto: createMarcaDTO): Promise<Marca> {
    return this.marcaService.create(createCategoriaDto);
  }

  @Get()
  findAll(): Promise<Marca[]> {
    return this.marcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Marca> {
    return this.marcaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: createMarcaDTO): Promise<Marca> {
    return this.marcaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
