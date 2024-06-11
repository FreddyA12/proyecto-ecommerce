import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity('detalles_pedidos')
export class detalle_pedido {
  @PrimaryGeneratedColumn()
  id_detalle_pedido: number;

  @Column()
  subtotal: Double;

  @Column()
  cantidad: number;
}
