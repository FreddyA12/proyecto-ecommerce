import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { CarritoDto } from './carrito.dto';
import { Carrito } from './carrito.entity';
import { CarritoService } from './carrito.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Carritos')
@Controller('/carrito')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class CarritoController {

    constructor(private readonly carritoService: CarritoService) {}
    // Crear un nuevo carrito
  
  @Post()
  @ModuleAccess('CARRITOS')
  @Permissions('CREARPRIVILEGIADO','CREAR')

  async create(@Body() carritoDto: CarritoDto): Promise<Carrito> {
    return await this.carritoService.create(carritoDto);
  }

  // Obtener todos los carritos
  @ModuleAccess('CARRITOS')
  @Permissions('VISUALIZARPRIVILEGIADO')
  @Get()
  async findAll(): Promise<Carrito[]> {
    return await this.carritoService.findAll();
  }

  // Obtener un carrito por su ID
  @Get(':id')
  @ModuleAccess('CARRITOS')
  @Permissions('VISUALIZAR','VISUALIZARPRIVILEGIADO')
  async findOne(@Param('id') id_carrito: number): Promise<Carrito> {
    return await this.carritoService.findOne(id_carrito);
  }
  

  // Actualizar un carrito por su ID

  @Put(':id')
  @ModuleAccess('CARRITOS')
  @Permissions('EDITAR','EDITARPRIVILEGIADO')
  async update(@Param('id') id_carrito: number, @Body() carritoDto: CarritoDto): Promise<Carrito> {
    return await this.carritoService.update(id_carrito, carritoDto);
  }

  // Eliminar un carrito por su ID
  @Delete(':id')
  @ModuleAccess('CARRITOS')
  @Permissions( 'ELIMINARPRIVILEGIADO')
  async delete(@Param('id') id_carrito: number): Promise<void> {
    return await this.carritoService.delete(id_carrito);
  }
}
