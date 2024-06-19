import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './permiso.entity';
import { CreatePermisoDTO } from './create-permiso-dto';
import { Rol } from '../rol/rol.entity';

@Injectable()
export class PermisoService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  async create(createPermisoDTO: CreatePermisoDTO): Promise<Permiso> {
    const { nombre, descripcion, rolesIds } = createPermisoDTO;

    const roles = await this.rolRepository.findByIds(rolesIds);
    if (roles.length !== rolesIds.length) {
      throw new NotFoundException('Uno o más roles no fueron encontrados');
    }

    const nuevoPermiso = this.permisoRepository.create({
      nombre,
      descripcion,
      roles
    });

    try {
      return await this.permisoRepository.save(nuevoPermiso);
    } catch (error) {
      throw new InternalServerErrorException('Error creando el permiso');
    }
  }

  async findAll(): Promise<Permiso[]> {
    try {
      return await this.permisoRepository.find({ relations: ['roles'] });
    } catch (error) {
      throw new InternalServerErrorException('Error recuperando los permisos');
    }
  }

  async findOne(id: number): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOne({
      where: { id_permiso: id },
      relations: ['roles']
    });
    if (!permiso) {
      throw new NotFoundException(`Permiso con ID "${id}" no encontrado`);
    }
    return permiso;
  }

  async update(id: number, updatePermisoDto: CreatePermisoDTO): Promise<Permiso> {
    let permiso = await this.findOne(id);
    const { nombre, descripcion, rolesIds } = updatePermisoDto;

    const roles = await this.rolRepository.findByIds(rolesIds);
    if (roles.length !== rolesIds.length) {
      throw new NotFoundException('Uno o más roles no fueron encontrados');
    }

    permiso.nombre = nombre;
    permiso.descripcion = descripcion;
    permiso.roles = roles;

    try {
      return await this.permisoRepository.save(permiso);
    } catch (error) {
      throw new InternalServerErrorException(`Error actualizando el permiso con ID "${id}"`);
    }
  }

  async remove(id: number): Promise<void> {
    let permiso = await this.findOne(id);
    try {
      await this.permisoRepository.remove(permiso);
    } catch (error) {
      throw new InternalServerErrorException(`Error en la eliminación, es posible que tenga relaciones`);
    }
  }
}
