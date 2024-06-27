import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ModuleAccess } from 'src/auth/decorators/module.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guards';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(JwtAuthGuard, PermisosGuard)
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
    @ModuleAccess('USUARIOS')
    @Permissions('VISUALIZARADMIN')
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
