// producto.entity.ts
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';
import { Detalle_pedido } from 'src/detalle_pedido/detalle_pedido.entity';
import { DetalleCarrito } from '../detalle_carrito/detalle_carrito.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Devolucion } from 'src/devolucion/devolucion.entity';

@Entity('Productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
precio_unitario: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column()
  stock: number;

  @Column()
  estado: string;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  @JoinColumn({ name: 'id_marca' })
  marca: Marca;

  @Column()
  descripcion: string;

  @OneToMany(() => Detalle_pedido, (detalle) => detalle.producto)
  detalles: Detalle_pedido[];
  //Agregar mas relaciones de acuerdo al mapeo
  @OneToMany(() => Devolucion, devolucion => devolucion.producto)
  devoluciones: Devolucion[];

  @ManyToOne(() => DetalleCarrito, detalleCarrito => detalleCarrito.productos)
  detalleCarrito: DetalleCarrito;
}
