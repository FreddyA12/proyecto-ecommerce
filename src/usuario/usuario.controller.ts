import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
    constructor (private usuarioService:UsuarioService){}

    @Post()
    async save (@Body() usuario: Usuario) {
        return await this.usuarioService.save(usuario);
    }
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Usuario> {
        return this.usuarioService.findOne(id);
    }
    @Get('/username/:username')
    findOneByUsername(@Param('username') username: string): Promise<Usuario> {
        return this.usuarioService.findOneByUsername(username);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUsuarioDto: Partial<Usuario>): Promise<Usuario> {
        return this.usuarioService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.usuarioService.remove(id);
    }
}
