import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDTO } from './create-menu-dto';
import { Rol } from '../rol/rol.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  async create(createMenuDTO: CreateMenuDTO): Promise<Menu> {
    const { nombre_menu, ruta, rolesIds } = createMenuDTO;

    const roles = await this.rolRepository.findByIds(rolesIds);
    if (roles.length !== rolesIds.length) {
      throw new NotFoundException('Uno o más roles no fueron encontrados');
    }

    const nuevoMenu = this.menuRepository.create({
      nombre_menu,
      ruta,
      roles
    });

    try {
      return await this.menuRepository.save(nuevoMenu);
    } catch (error) {
      throw new InternalServerErrorException('Error creando el menú');
    }
  }

  async findAll(): Promise<Menu[]> {
    try {
      return await this.menuRepository.find({ relations: ['roles'] });
    } catch (error) {
      throw new InternalServerErrorException('Error recuperando los menús');
    }
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id_menu: id },
      relations: ['roles']
    });
    if (!menu) {
      throw new NotFoundException(`Menú con ID "${id}" no encontrado`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: CreateMenuDTO): Promise<Menu> {
    let menu = await this.findOne(id);
    const { nombre_menu, ruta, rolesIds } = updateMenuDto;

    const roles = await this.rolRepository.findByIds(rolesIds);
    if (roles.length !== rolesIds.length) {
      throw new NotFoundException('Uno o más roles no fueron encontrados');
    }

    menu.nombre_menu = nombre_menu;
    menu.ruta = ruta;
    menu.roles = roles;

    try {
      return await this.menuRepository.save(menu);
    } catch (error) {
      throw new InternalServerErrorException(`Error actualizando el menú con ID "${id}"`);
    }
  }

  async remove(id: number): Promise<void> {
    let menu = await this.findOne(id);
    try {
      await this.menuRepository.remove(menu);
    } catch (error) {
      throw new InternalServerErrorException(`Error en la eliminación, es posible que tenga relaciones`);
    }
  }
}
