import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoIdentificacion } from './tipo-identificacion.entity';
import { TipoIdentificacionService } from './tipo-identificacion.service';

@Controller('identificaciones')
export class TipoIdentificacionController {
    constructor(private readonly tipoIdentificacionService: TipoIdentificacionService) {}

    @Get()
    findAll(): Promise<TipoIdentificacion[]> {
        return this.tipoIdentificacionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.findOne(id);
    }

    @Post()
    create(@Body() tipoIdentificacion: TipoIdentificacion): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.create(tipoIdentificacion);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() tipoIdentificacion: Partial<TipoIdentificacion>): Promise<TipoIdentificacion> {
        return this.tipoIdentificacionService.update(id, tipoIdentificacion);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.tipoIdentificacionService.remove(id);
    }
}
