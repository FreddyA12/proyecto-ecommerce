import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'somoslosmejores',
    });
  }

  async validate(payload: any) {
    return {
      id_usuario: payload.id_usuario,
      nombre_usuario: payload.nombre_usuario,
      estado_usuario: payload.estado_usuario,
      eliminado: payload.eliminado,
      fecha_ultima_conexion: payload.fecha_ultima_conexion,
      roles: payload.roles,
    };
  }
}
