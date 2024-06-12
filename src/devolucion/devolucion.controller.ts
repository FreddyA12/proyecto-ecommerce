import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DevolucionService } from './devolucion.service';
import { DevolucionDto } from './dto/devolucion.dto';
import { Devolucion } from './devolucion.entity';

@Controller('/devolucion')
export class DevolucionController {

    constructor(private readonly devolucionService: DevolucionService) {}

    @Post()
    create(@Body() devolucionDto: DevolucionDto): Promise<Devolucion>{
        return this.devolucionService.create(devolucionDto);
    }

    @Get()
    findAll(): Promise<Devolucion[]>{
        return this.devolucionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id_devolucion: number): Promise<Devolucion>{
        return this.devolucionService.findOne(id_devolucion);
    }

    @Put(':id')
    update (@Param('id') id_devolucion:number,@Body() devolucionDto:DevolucionDto): Promise<Devolucion>{
        return this.devolucionService.update(id_devolucion,devolucionDto);
    }

    @Delete(':id')
    async delete(@Param('id') id_devolucion: number): Promise<void>{
        this.devolucionService.delete(id_devolucion);
    }
}
