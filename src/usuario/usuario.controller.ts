import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
    constructor (private usuarioService:UsuarioService){}

    @Post()
    async save (@Body() usuario: Usuario) {
        return await this.usuarioService.save(usuario);
    }
}
