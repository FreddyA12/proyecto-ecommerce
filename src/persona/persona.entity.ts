import { Entity, Column, PrimaryGeneratedColumn ,OneToOne, OneToMany, JoinColumn} from 'typeorm';
import { Usuarios } from '../usuario/usuario.entity';
import { TipoIdentificacion } from '../tipo-identificacion/tipo-identificacion.entity';

@Entity('personas')
export class Personas {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  identificacion: string;

  @OneToMany(() => TipoIdentificacion, tipoIdentificacion => tipoIdentificacion.persona)
  tipo_identificacion: TipoIdentificacion[];
 

  @Column()
  direccion: string;

  @Column()
  celular: string;

  @Column()
  telefono: string;

  @Column()
  correo_electronico: string;

  @Column()
  estado: string;

  @Column()
  eliminado: boolean;

    @OneToOne(() => Usuarios, usuario => usuario.id_persona)
    usuario: Usuarios;
}
