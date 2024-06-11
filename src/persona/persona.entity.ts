import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { TipoIdentificacion } from '../tipo-identificacion/tipo-identificacion.entity';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  identificacion: string;

  @ManyToOne(() => TipoIdentificacion)
  @JoinColumn({ name: 'id_tipo_identificacion' })
  tipoIdentificacion: TipoIdentificacion;

  @Column()
  direccion: string;

  @Column()
  celular: string;

  @Column()
  telefono: string;

  @Column()
  correo_electronico: string;

  @Column()
  estado: string; //inactivo o activo

  @Column()
  eliminado: boolean;

  @OneToOne(() => Usuario, (usuario) => usuario.persona)
  usuario: Usuario;
}
