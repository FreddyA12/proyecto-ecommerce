import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne, OneToMany } from 'typeorm';
import{Persona} from '../persona/persona.entity';


@Entity('tipos_identificaciones')
export class TipoIdentificacion {
    @PrimaryGeneratedColumn()
    id_tipo_identificacion: number;

    @Column()
    nombre: String;

    @Column()
    estado: String;

    @OneToMany(() => Persona, persona => persona.tipoIdentificacion)
    personas: Persona[];

}