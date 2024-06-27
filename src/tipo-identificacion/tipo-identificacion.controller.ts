import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TipoIdentificacion } from './tipo-identificacion.entity';
import { TipoIdentificacionService } from './tipo-identificacion.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Tipos de Identificacioness')
@Controller('identificaciones')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class TipoIdentificacionController {
    constructor(private readonly tipoIdentificacionService: TipoIdentificacionService) {}

    @Get()
    @ModuleAccess('IDENTIFICACIONES')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    findAll(): Promise<TipoIdentificacion[]> {
        return this.tipoIdentificacionService.findAll();
    }

    @Get(':id')
    @ModuleAccess('IDENTIFICACIONES')
    @Permissions('VISUALIZARPRIVILEGIADO', 'VISUALIZAR')
    findOne(@Param('id') id: number): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.findOne(id);
    }

    @Post()
    @ModuleAccess('IDENTIFICACIONES')
    @Permissions('CREARPRIVILEGIADO')
    create(@Body() tipoIdentificacion: TipoIdentificacion): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.create(tipoIdentificacion);
    }

    @Put(':id')
    @ModuleAccess('IDENTIFICACIONES')
    @Permissions('EDITARPRIVILEGIADO')
    update(@Param('id') id: number, @Body() tipoIdentificacion: Partial<TipoIdentificacion>): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.update(id, tipoIdentificacion);
    }

    @Delete(':id')
    @ModuleAccess('IDENTIFICACIONES')
    @Permissions('ELIMINARPRIVILEGIADO')
    remove(@Param('id') id: number): Promise<void> {
        return this.tipoIdentificacionService.remove(id);
    }
}
