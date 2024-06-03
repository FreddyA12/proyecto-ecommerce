import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany,JoinTable, OneToMany } from 'typeorm';
import { Persona } from '../persona/persona.entity';
import {Roles} from '../rol/rol.entity';
import { Factura } from 'src/facturas/facturas.entity';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_usuario: string;

  @Column()
  password: string;

  @OneToOne(() => Persona, persona => persona.usuario, { cascade: true })
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @Column()
  fecha_registro: Date;

  @Column()
  estado_usuario: string;

  @Column()
  eliminado: boolean;

  @Column()
  fecha_ultima_conexion: Date;

  @ManyToMany(() => Roles)
  @JoinTable({ name: 'usuarios_roles' })
  roles: Roles[];

  @OneToMany(() => Factura, factura => factura.usuario)
  facturas: Factura[];
}
