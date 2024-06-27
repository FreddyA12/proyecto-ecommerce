import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductDto, UpdateProductDto } from './producto.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';



@ApiTags('Productos')
@Controller('productos')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class ProductoController {

    constructor(private readonly productService: ProductoService) {}

  @Post()
  @ModuleAccess('PRODUCTOS')
  @Permissions('CREARPRIVILEGIADO')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ModuleAccess('PRODUCTOS')
  @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ModuleAccess('PRODUCTOS')
  @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @ModuleAccess('PRODUCTOS')
  @Permissions('EDITARPRIVILEGIADO')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ModuleAccess('PRODUCTOS')
  @Permissions('ELIMINARPRIVILEGIADO')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
