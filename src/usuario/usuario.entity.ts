import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany,JoinTable } from 'typeorm';
import { Personas } from '../persona/persona.entity';
import {Roles} from '../rol/rol.entity';
@Entity('usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_usuario: string;

  @Column()
  password: string;

  @OneToOne(() => Personas)
  @JoinColumn({ name: 'id_persona' })
  id_persona: Personas;

  @Column()
  fecha_registro: Date;

  @Column()
  estado_usuario: string;

  @Column()
  eliminado: boolean;

  @Column()
  fecha_ultima_conexion: Date;

  @ManyToMany(() => Roles, rol => rol.usuarios)
  @JoinTable({
    name: 'usuarios_roles', 
    joinColumn: {
      name: 'id_usuario',
      referencedColumnName: 'id_usuario',
    },
    inverseJoinColumn: {
      name: 'id_rol',
      referencedColumnName: 'id_rol',
    },
  })
  roles: Roles[];
}
