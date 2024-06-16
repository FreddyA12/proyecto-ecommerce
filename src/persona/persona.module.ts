import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona } from './persona.entity';
import { TipoIdentificacion } from 'src/tipo-identificacion/tipo-identificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona,TipoIdentificacion])],
  providers: [PersonaService],
  controllers: [PersonaController]
})
export class PersonaModule {}
