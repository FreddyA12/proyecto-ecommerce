import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DetalleCarritoService } from './detalle_carrito.service';
import { DetalleCarrito } from './detalle_carrito.entity';
import { CreateDetalleCarritoDto } from './create-detalle_carrito.dto';
import { ApiTags } from '@nestjs/swagger';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('detalle_carrito')
@Controller('detalles_carrito')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class DetalleCarritoController {
  constructor(private readonly detalleCarritoService: DetalleCarritoService) {}

  @Post()
  @ModuleAccess('DETALLESCARRITOS')
  @Permissions('CREAR', 'CREARPRIVILEGIADO')
  create(@Body() createDetalleCarritoDto: CreateDetalleCarritoDto): Promise<DetalleCarrito> {
    return this.detalleCarritoService.create(createDetalleCarritoDto);
  }

  @Get()
  @ModuleAccess('DETALLESCARRITOS')
  @Permissions('VISUALIZAR', 'VISUALIARPRIVILEGIADO')
  findAll(): Promise<DetalleCarrito[]> {
    return this.detalleCarritoService.findAll();
  }

  @Get(':id')
  @ModuleAccess('DETALLESCARRITOS')
  @Permissions('VISUALIZAR', 'VISUALIARPRIVILEGIADO')
  findOne(@Param('id') id: number): Promise<DetalleCarrito> {
    return this.detalleCarritoService.findOne(id);
  }

  @Put(':id')
  @ModuleAccess('DETALLESCARRITOS')
  @Permissions('EDITAR', 'EDITARPRIVILEGIADO')
  update(@Param('id') id: number, @Body() updateDetalleCarritoDto: CreateDetalleCarritoDto): Promise<DetalleCarrito> {
    return this.detalleCarritoService.update(id, updateDetalleCarritoDto);
  }

  @Delete(':id')
  @ModuleAccess('DETALLESCARRITOS')
  @Permissions('ELIMINAR', 'ELIMINARPRIVILEGIADO')
  remove(@Param('id') id: number): Promise<void> {
    return this.detalleCarritoService.remove(id);
  }
}
