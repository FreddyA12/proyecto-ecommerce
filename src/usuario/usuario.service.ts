import { ConflictException, Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    ) { }

    async findOneByUsername(nombre_usuario: string,): Promise<Usuario | undefined> {

        return await this.usuarioRepository.findOne({ where: { nombre_usuario } });
    }


    async save(usuario: Usuario) {

        const salt = await bcrypt.genSalt();
        usuario.password = await bcrypt.hash(usuario.password, salt);

        const existingDocenteByUsername = await this.findOneByUsername(usuario.nombre_usuario);
        if (existingDocenteByUsername) {
            throw new ConflictException('El nombre de usuario ya está en uso. Por favor, utiliza otro.');
        }

        return await this.usuarioRepository.save(usuario);
    }
}
