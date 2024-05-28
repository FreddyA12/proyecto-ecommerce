import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne } from 'typeorm';
import{Personas} from '../persona/persona.entity';


@Entity('tipos_identificacion')
export class TipoIdentificacion {
    @PrimaryGeneratedColumn()
    id_tipo_identificacion: number;

    @Column()
    nombre: String;

    @Column()
    estado: String;

    @ManyToOne(() => Personas, persona => persona.tipo_identificacion)
    persona: Personas;

}