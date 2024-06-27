import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { Carrito } from '../carrito/carrito.entity';

@Entity('detalles_carrito')
export class DetalleCarrito {
  @PrimaryGeneratedColumn()
  id_detalles_carrito: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Carrito, carrito => carrito.detallesCarrito)
  @JoinColumn({ name: 'id_carrito' })
  carrito: Carrito;

  @ManyToOne(() => Producto, producto => producto.detalleCarrito)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
