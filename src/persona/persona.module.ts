import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona } from './persona.entity';
import { TipoIdentificacion } from 'src/tipo-identificacion/tipo-identificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PermisoService } from 'src/permiso/permiso.service';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona,TipoIdentificacion,Permiso, Usuario,Rol])],
  providers: [PersonaService, PermisoService],
  controllers: [PersonaController]
})
export class PersonaModule {}
