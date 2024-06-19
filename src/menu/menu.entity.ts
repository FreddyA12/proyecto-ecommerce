import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Rol } from '../rol/rol.entity';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id_menu: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_menu: string;

  @Column({ type: 'varchar', length: 255 })
  ruta: string;

  @ManyToMany(() => Rol, rol => rol.menus)
  @JoinTable({ name: 'roles_menus' })
  roles: Rol[];
}
