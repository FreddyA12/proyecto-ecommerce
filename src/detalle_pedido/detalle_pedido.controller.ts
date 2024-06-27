import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { Detalle_pedido } from './detalle_pedido.entity';
import { ApiTags } from '@nestjs/swagger';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('DetallePedidos')
@Controller('detalle-pedido')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  @ModuleAccess('DETALLESPEDIDOS')
  @Permissions('CREAR', 'CREARPRIVILEGIADO')
  async create(@Body() createDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    return await this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  @ModuleAccess('DETALLESPEDIDOS')
  @Permissions('VISUALIZAR', 'VISUALIZARPRIVILEGIADO')
  async findAll(): Promise<Detalle_pedido[]> {
    return await this.detallePedidoService.findAll();
  }

  @Get(':id')
  @ModuleAccess('DETALLESPEDIDOS')
  @Permissions('VISUALIZAR', 'VISUALIZARPRIVILEGIADO')
  async findOne(@Param('id') id: number): Promise<Detalle_pedido> {
    return await this.detallePedidoService.findOne(id);
  }

  @Put(':id')
  @ModuleAccess('DETALLESPEDIDOS')
  @Permissions('EDITAR', 'EDITARPRIVILEGIADO')
  async update(@Param('id') id: number, @Body() updateDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    return await this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  @ModuleAccess('DETALLESPEDIDOS')
  @Permissions('ELIMINAR', 'ELIMINARPRIVILEGIADO')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.detallePedidoService.remove(id);
  }
}
