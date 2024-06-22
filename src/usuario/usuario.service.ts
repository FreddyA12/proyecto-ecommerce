import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    ) { }

    async findOneByUsername(nombre_usuario: string, options = {}): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({ where: { nombre_usuario }, ...options });
      }
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({ relations: ['persona', 'roles', 'pedidos'] });
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: id }, relations: ['persona', 'roles', 'pedidos'] });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async remove(id: number): Promise<void> {
        try {
            const result = await this.usuarioRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`No se encontró el usuario con ID ${id} para eliminar`);
            }
        } catch (error) {
            // Aquí se manejan los errores que no son de "no encontrado", como errores de conexión, etc.
            console.error('Error al eliminar el usuario:', error);
            throw new ConflictException('Error al eliminar el usuario. Es posible que temga relaciones.');
        }
    }

    async update(id: number, updateUsuarioDto: Partial<Usuario>): Promise<Usuario> {
        
        const usuario = await this.findOne(id);
        this.usuarioRepository.merge(usuario, updateUsuarioDto);
        const salt = await bcrypt.genSalt();
        usuario.password = await bcrypt.hash(usuario.password, salt);
        return await this.usuarioRepository.save(usuario);
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
