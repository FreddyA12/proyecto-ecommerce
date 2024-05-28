import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'somoslosmejores',
      signOptions: { expiresIn: '1d' },
    }),
    UsuarioModule, // implementar el modulo de usuarios
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalGuard, JwtStrategy],
})
export class AuthModule {}
