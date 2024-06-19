import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Menu } from '../menu/menu.entity'; 
import { Permiso } from '../permiso/permiso.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 255 })
  tipo_rol: string;

  @ManyToMany(() => Usuario, usuario => usuario.roles)
  usuarios: Usuario[];
  @ManyToMany(() => Menu, menu => menu.roles)
  menus: Usuario[];
  @ManyToMany(() => Permiso, permiso => permiso.roles)
  permisos: Permiso[];
}
