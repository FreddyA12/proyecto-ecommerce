import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';

@Module({
  providers: [FacturasService]
})
export class FacturasModule {}
