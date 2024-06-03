import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('facturas')
export class Factura{
    @PrimaryGeneratedColumn()
    id_factura: number;

    @Column({ type: 'date' })
    fecha_factura: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @ManyToOne(()=> Usuario, usuario=> usuario.facturas)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
    

}