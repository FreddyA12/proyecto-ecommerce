import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Rol } from '../rol/rol.entity';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @ManyToMany(() => Rol, rol => rol.permisos)
  @JoinTable({ name: 'roles_permisos' }) 
  roles: Rol[];
}
