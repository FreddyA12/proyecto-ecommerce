import { Body, Controller, Get, Param, Post, Put ,Delete, UseGuards} from '@nestjs/common';
import { DevolucionService } from './devolucion.service';
import { DevolucionDto } from './dto/devolucion.dto';
import { Devolucion } from './devolucion.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Devoluciones')
@Controller('/devolucion')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class DevolucionController {

    constructor(private readonly devolucionService: DevolucionService) {}

    @Post()
    @ModuleAccess('DEVOLUCIONES')
    @Permissions('CREARPRIVILEGIADO', 'CREAR')
    create(@Body() devolucionDto: DevolucionDto): Promise<Devolucion>{
        return this.devolucionService.create(devolucionDto);
    }

    @Get()
    @ModuleAccess('DEVOLUCIONES')
    @Permissions('VISUALIZARPRIVILEGIADO','VISUALIZAR')
    findAll(): Promise<Devolucion[]>{
        return this.devolucionService.findAll();
    }

    @Get(':id')
    @ModuleAccess('DEVOLUCIONES')
    @Permissions('VISUALIZARPRIVILEGIADO','VISUALIZAR')
    findOne(@Param('id')id_devolucion: number): Promise<Devolucion>{
        return this.devolucionService.findOne(id_devolucion);
    }

    @Put(':id')
    @ModuleAccess('DEVOLUCIONES')
    @Permissions('EDITARPRIVILEGIADO')
    update (@Param('id') id_devolucion:number,@Body() devolucionDto:DevolucionDto): Promise<Devolucion>{
        return this.devolucionService.update(id_devolucion,devolucionDto);
    }

    @Delete(':id')
    @ModuleAccess('DEVOLUCIONES')
    @Permissions('ELIMINARPRIVILEGIADO')
    async delete(id_devolucion:number): Promise<void>{
       this.devolucionService.delete(id_devolucion);
    }

}
