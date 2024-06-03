import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('facturas')
export class Factura{
    @PrimaryGeneratedColumn()
    id_factura: number;

    @Column({ type: 'date' })  // Asegúrate de que el tipo coincida con el uso en el servicio
    fecha_factura: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @ManyToOne(()=> Usuario, usuario=> usuario.facturas)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
    

}