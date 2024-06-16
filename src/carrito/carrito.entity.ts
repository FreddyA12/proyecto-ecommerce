import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('carritos')
export class Carrito{
    @PrimaryGeneratedColumn()
    id_carrito: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;
    
    @Column()
    estado:string;

    @OneToOne(()=> Usuario,usuario=> usuario.carrito)
    @JoinColumn()
    usuario:Usuario;
}