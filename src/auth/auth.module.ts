import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PermisoModule } from 'src/permiso/permiso.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/marca/marca.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { Rol } from 'src/rol/rol.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'somoslosmejores',
      signOptions: { expiresIn: '1d' },
    }),
    UsuarioModule,
    PermisoModule, // Asegúrate de importar PermisoModule aquí
    TypeOrmModule.forFeature([Marca, Permiso, Rol, Usuario]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalGuard, JwtStrategy],
})
export class AuthModule {}
