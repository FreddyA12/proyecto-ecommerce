import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { Detalle_pedido } from './detalle_pedido.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('DetallePedidos')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  async create(@Body() createDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    return await this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  async findAll(): Promise<Detalle_pedido[]> {
    return await this.detallePedidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Detalle_pedido> {
    return await this.detallePedidoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    return await this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.detallePedidoService.remove(id);
  }
}
