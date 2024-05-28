import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDTO } from './dto/auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService, // buscar de donde se almacena el usuario, en nuestra base de la tabla usuarios
    private jwtService: JwtService,
  ) {}

  async validateUser({ nombre_usuario, contrasenia }: AuthPayloadDTO) {
    const findUser =
      await this.usuarioService.findOneByUsername(nombre_usuario);
    if (!findUser) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isMatch = await bcrypt.compare(contrasenia, findUser.contrasenia);
    if (isMatch) {
      const { contrasenia, persona, cargo, ...userDetails } = findUser;
      return this.jwtService.sign(userDetails); 
    }

    throw new UnauthorizedException('Credenciales invalidas');
  }
}
