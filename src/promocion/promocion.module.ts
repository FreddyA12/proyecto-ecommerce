import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';

@Module({
  providers: [PromocionService],
  controllers: [PromocionController]
})
export class PromocionModule {}
