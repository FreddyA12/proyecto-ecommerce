import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { Rol } from './rol.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol]),
    UsuarioModule // Importar el módulo Usuario
  ],
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
