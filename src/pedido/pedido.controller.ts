import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/pedido.dto';
import { Pedido } from './pedido.entity';

@Controller('/pedidos') // aqui va la ruta
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Post()
    create(@Body() createPedidoDto: CreatePedidoDto) {
      return this.pedidoService.create(createPedidoDto);
    }
  
    @Get()
    findAll(): Promise<Pedido[]> {
      return this.pedidoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) : Promise<Pedido>{
      return this.pedidoService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id_pedido: number, @Body() pedidoDto: CreatePedidoDto): Promise<Pedido> {
      return this.pedidoService.update(id_pedido, pedidoDto);
}

    @Delete(':id')
    remove(@Param('id') id: number) {
    return this.pedidoService.remove(id);
  }
}
