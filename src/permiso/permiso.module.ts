import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { Permiso } from './permiso.entity';
import { Rol } from '../rol/rol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permiso, Rol])
  ],
  providers: [PermisoService],
  controllers: [PermisoController]
})
export class PermisoModule {}
