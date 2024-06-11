import { Module } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPagoController } from './metodo-pago.controller';

@Module({
  providers: [MetodoPagoService],
  controllers: [MetodoPagoController]
})
export class MetodoPagoModule {}
