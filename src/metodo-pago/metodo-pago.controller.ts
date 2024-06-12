import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPago } from './metodo-pago.entity';
import { DtoMetodoPago } from './dto/metodo-pago.dto';

@Controller('/metodo-pago')
export class MetodoPagoController {

    constructor(private readonly metodoPagoService: MetodoPagoService) {}

    @Post()
    create(@Body() dtoMetodoPago: DtoMetodoPago) {
        return this.metodoPagoService.create(dtoMetodoPago);
    }

    @Get()
    async findAll(): Promise<MetodoPago[]> {
        return this.metodoPagoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id')id_metodo_pago: number): Promise<MetodoPago> {
        return this.metodoPagoService.findOne(id_metodo_pago);
    }

    @Put(':id')
    async update(@Param('id') id_metodo_pago: number, @Body() dtoMetodoPago: DtoMetodoPago): Promise<MetodoPago> {
            return this.metodoPagoService.update(id_metodo_pago, dtoMetodoPago);
    }

    @Delete(':id')
    async delete(@Param('id') id_metodo_pago: number): Promise<void>{
        this.metodoPagoService.delete(id_metodo_pago);
    }
        
    

}
