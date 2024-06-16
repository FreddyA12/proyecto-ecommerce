import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';

@Module({
  providers: [CarritoService]
})
export class CarritoModule {}
