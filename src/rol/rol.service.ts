import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Rol } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDTO } from './create-rol-dto';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async create(createRolDTO: CreateRolDTO): Promise<Rol> {
    const { tipo_rol, usuariosIds } = createRolDTO;

    const usuarios = await this.usuarioRepository.findByIds(usuariosIds);
    if (usuarios.length !== usuariosIds.length) {
      throw new NotFoundException('Los usuarios no existen');
    }

    const nuevoRol = this.rolRepository.create({
      tipo_rol,
      usuarios
    });

    try {
     
      return await this.rolRepository.save(nuevoRol);
    } catch (error) {
      
      throw new InternalServerErrorException('Error creando el rol');
    }
  }

  async findAll(): Promise<Rol[]> {
    try {
      return await this.rolRepository.find({ relations: ['usuarios'] });
    } catch (error) {
      throw new InternalServerErrorException('Error recuperando los roles');
    }
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { id_rol: id },
      relations: ['usuarios']
    });
    if (!rol) {
      throw new NotFoundException(`Rol con ID "${id}" no encontrado`);
    }
    return rol;
  }

  async update(id: number, updateRolDto: CreateRolDTO): Promise<Rol> {
    let rol = await this.findOne(id);
    const { tipo_rol, usuariosIds } = updateRolDto;

    const usuarios = await this.usuarioRepository.findByIds(usuariosIds);
    if (usuarios.length !== usuariosIds.length) {
      throw new NotFoundException('Uno o más usuarios no fueron encontrados');
    }

    rol.tipo_rol = tipo_rol;
    rol.usuarios = usuarios;

    try {
      return await this.rolRepository.save(rol);
    } catch (error) {
      throw new InternalServerErrorException(`Error actualizando el rol con ID "${id}"`);
    }
  }

  async remove(id: number): Promise<void> {
    let rol = await this.findOne(id);
    try {
      await this.rolRepository.remove(rol);
    } catch (error) {
      throw new InternalServerErrorException(`Error en la eliminación, es posible que tenga relaciones`);
    }
  }
}
