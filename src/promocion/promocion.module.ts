import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { Promocion } from './promocion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promocion])
  ],
  providers: [PromocionService],
  controllers: [PromocionController]
})
export class PromocionModule {}
