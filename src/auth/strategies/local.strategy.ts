import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nombre_usuario',
      passwordField: 'password',
    });
  }

  async validate(nombre_usuario: string, password: string): Promise<any> {
    console.log('hola');
    const user = await this.authService.validateUser({
      nombre_usuario,
      password,
    });
    if (!user) throw new UnauthorizedException('No');
    return user;
  }
}
