import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Persona } from '../persona/persona.entity';

@Entity('tipos_identificaciones')
export class TipoIdentificacion {
  @PrimaryGeneratedColumn()
  id_tipo_identificacion: number;

  @Column()
  nombre: string;

  @Column()
  estado: string;

  @OneToMany(() => Persona, (persona) => persona.tipoIdentificacion)
  personas: Persona[];
}
