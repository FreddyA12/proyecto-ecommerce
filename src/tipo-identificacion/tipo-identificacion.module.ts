import { Module } from '@nestjs/common';
import { TipoIdentificacionService } from './tipo-identificacion.service';
import { TipoIdentificacionController } from './tipo-identificacion.controller';

@Module({
  providers: [TipoIdentificacionService],
  controllers: [TipoIdentificacionController]
})
export class TipoIdentificacionModule {}
