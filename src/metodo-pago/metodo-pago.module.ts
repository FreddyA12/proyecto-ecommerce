import { Module } from '@nestjs/common';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPagoController } from './metodo-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPago } from './metodo-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago])],
  providers: [MetodoPagoService],
  controllers: [MetodoPagoController],
})
export class MetodoPagoModule {}
