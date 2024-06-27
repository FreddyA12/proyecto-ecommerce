import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/pedido.dto';
import { Pedido } from './pedido.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';


@ApiTags('Pedidos')
@Controller('/pedidos') 
@UseGuards(JwtAuthGuard, PermisosGuard)
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Post()
    @ModuleAccess('PEDIDOS')
    @Permissions('CREARPRIVILEGIADO', 'CREAR')
    create(@Body() createPedidoDto: CreatePedidoDto) {
      return this.pedidoService.create(createPedidoDto);
    }
  
    @Get()
    @ModuleAccess('PEDIDOS')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    findAll(): Promise<Pedido[]> {
      return this.pedidoService.findAll();
    }
  
    @Get(':id')
    @ModuleAccess('PEDIDOS')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    findOne(@Param('id') id: number) : Promise<Pedido>{
      return this.pedidoService.findOne(id);
    }

    @Put(':id')
    @ModuleAccess('PEDIDOS')
    @Permissions('EDITARRPRIVILEGIADO', 'EDITAR')
    async update(@Param('id') id_pedido: number, @Body() pedidoDto: CreatePedidoDto): Promise<Pedido> {
      return this.pedidoService.update(id_pedido, pedidoDto);
}

    @Delete(':id')
    @ModuleAccess('PEDIDOS')
    @Permissions('ELIMINARPRIVILEGIADO', 'ELIMINAR')
    remove(@Param('id') id: number) {
    return this.pedidoService.remove(id);
  }
}
