import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Double,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Producto } from 'src/producto/producto.entity';

@Entity('detalles_pedidos')
export class Detalle_pedido {
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @Column()
  subtotal: Double;

  @Column()
  cantidad: number;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
