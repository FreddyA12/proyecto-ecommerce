import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { Pedido } from "src/pedido/pedido.entity";
import { Producto } from "src/producto/producto.entity";
import { Column, Entity,  JoinColumn,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('devoluciones')
export class Devolucion{
    @PrimaryGeneratedColumn()
    id_devolucion: number;

    @ManyToOne(()=> Pedido, pedido => pedido.devoluciones)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido;


    @Column()
    motivo: string;

    @Column()
    cantidad: number;

    @Column({ type: 'timestamp' }) // Asegúrate de que el tipo coincida con el uso en el servicio
    fecha_devolucion: Date;

    @ManyToOne(() => Producto, producto => producto.devoluciones)
    @JoinColumn({ name: 'id_producto' })
    producto: Producto;

}