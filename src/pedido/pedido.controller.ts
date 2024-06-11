import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/pedido.dto';

@Controller('/pedidos') // aqui va la ruta
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Post()
    create(@Body() createPedidoDto: CreatePedidoDto) {
      return this.pedidoService.create(createPedidoDto);
    }
  
    @Get()
    findAll() {
      return this.pedidoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.pedidoService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
    return this.pedidoService.remove(id);
  }
}
