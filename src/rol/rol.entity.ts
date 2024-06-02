import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 255 })
  tipo_rol: string;

  @ManyToMany(() => Usuario, usuario => usuario.roles)
  usuarios: Usuario[];
}