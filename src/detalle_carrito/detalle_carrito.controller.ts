import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleCarritoService } from './detalle_carrito.service';
import { DetalleCarrito } from './detalle_carrito.entity';
import { CreateDetalleCarritoDTO } from './create-detalle_carrito-dto';

@Controller('detalles_carrito')
export class DetalleCarritoController {
  constructor(private readonly detalleCarritoService: DetalleCarritoService) {}

  @Post()
  create(@Body() createDetalleCarritoDto: CreateDetalleCarritoDTO): Promise<DetalleCarrito> {
    return this.detalleCarritoService.create(createDetalleCarritoDto);
  }

  @Get()
  findAll(): Promise<DetalleCarrito[]> {
    return this.detalleCarritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DetalleCarrito> {
    return this.detalleCarritoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDetalleCarritoDto: CreateDetalleCarritoDTO): Promise<DetalleCarrito> {
    return this.detalleCarritoService.update(id, updateDetalleCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.detalleCarritoService.remove(id);
  }
}
