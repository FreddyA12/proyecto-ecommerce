import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from './marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  providers: [MarcaService],
  controllers: [MarcaController]
})
export class MarcaModule {}
