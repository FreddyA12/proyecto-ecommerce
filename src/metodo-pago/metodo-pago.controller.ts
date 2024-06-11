import { Body, Controller, Post } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { DtoMetodoPago } from './dto/metodo-pago.dto';

@Controller('/metodo-pago')
export class MetodoPagoController {

    constructor(private readonly metodoPagoService: MetodoPagoService) {}

    @Post()
    create(@Body() dtoMetodoPago: DtoMetodoPago) {
        return this.metodoPagoService.create(dtoMetodoPago);
    }
}
