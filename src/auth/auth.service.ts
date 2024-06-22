import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDTO } from './dto/auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ nombre_usuario, password }: AuthPayloadDTO) {
    const findUser = await this.usuarioService.findOneByUsername(nombre_usuario, { relations: ['roles'] });
    if (!findUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const { password, persona, fecha_registro, roles, ...userDetails } = findUser;
      const userRoles = roles.map(rol => rol.tipo_rol); 
      return {
        token: this.jwtService.sign({ ...userDetails, roles: userRoles }),
      };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
