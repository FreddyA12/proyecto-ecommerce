import { Body, Controller, Post, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPago } from './metodo-pago.entity';
import { DtoMetodoPago } from './dto/metodo-pago.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Metodos de Pagos')
@Controller('/metodo-pago')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class MetodoPagoController {

    constructor(private readonly metodoPagoService: MetodoPagoService) {}

    @Post()
    @ModuleAccess('METODOSPAGO')
    @Permissions('CREARPRIVILEGIADO')
    create(@Body() dtoMetodoPago: DtoMetodoPago) {
        return this.metodoPagoService.create(dtoMetodoPago);
    }

    @Get()
    @ModuleAccess('METODOSPAGO')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    async findAll(): Promise<MetodoPago[]> {
        return this.metodoPagoService.findAll();
    }

    @Get(':id')
    @ModuleAccess('METODOSPAGO')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    async findOne(@Param('id')id_metodo_pago: number): Promise<MetodoPago> {
        return this.metodoPagoService.findOne(id_metodo_pago);
    }

    @Put(':id')
    @ModuleAccess('METODOSPAGO')
    @Permissions('EDITARPRIVILEGIADO')
    async update(@Param('id') id_metodo_pago: number, @Body() dtoMetodoPago: DtoMetodoPago): Promise<MetodoPago> {
            return this.metodoPagoService.update(id_metodo_pago, dtoMetodoPago);
    }

    @Delete(':id')
    @ModuleAccess('METODOSPAGO')
    @Permissions('ELIMINARPRIVILEGIADO')
    async delete(@Param('id') id_metodo_pago: number): Promise<void>{
        this.metodoPagoService.delete(id_metodo_pago);
    }
        
    

}
