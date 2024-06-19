import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarritoDto } from './carrito.dto';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carritos')
@Controller('/carrito')
export class CarritoController {

    constructor(private readonly carritoService: CarritoService) {}
    // Crear un nuevo carrito
  @Post()
  async create(@Body() carritoDto: CarritoDto): Promise<Carrito> {
    return await this.carritoService.create(carritoDto);
  }

  // Obtener todos los carritos
  @Get()
  async findAll(): Promise<Carrito[]> {
    return await this.carritoService.findAll();
  }

  // Obtener un carrito por su ID
  @Get(':id')
  async findOne(@Param('id') id_carrito: number): Promise<Carrito> {
    return await this.carritoService.findOne(id_carrito);
  }

  // Actualizar un carrito por su ID
  @Put(':id')
  async update(@Param('id') id_carrito: number, @Body() carritoDto: CarritoDto): Promise<Carrito> {
    return await this.carritoService.update(id_carrito, carritoDto);
  }

  // Eliminar un carrito por su ID
  @Delete(':id')
  async delete(@Param('id') id_carrito: number): Promise<void> {
    return await this.carritoService.delete(id_carrito);
  }
}
