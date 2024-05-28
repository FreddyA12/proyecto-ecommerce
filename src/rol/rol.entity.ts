import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Usuarios } from '../usuario/usuario.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 255 })
  tipo_rol: string;

  @ManyToMany(() => Usuarios, usuario => usuario.roles)
  usuarios: Usuarios[];
}