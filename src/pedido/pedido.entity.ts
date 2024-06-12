import { Usuario } from 'src/usuario/usuario.entity';
import { Detalle_pedido } from 'src/detalle_pedido/detalle_pedido.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MetodoPago } from 'src/metodo-pago/metodo-pago.entity';

@Entity('pedidos') // aqui va el nombre de la tabla de la base
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column({ type: 'timestamp' }) // Asegúrate de que el tipo coincida con el uso en el servicio
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Falta el id del método de pago
  @ManyToOne(() => MetodoPago, metodoPago => metodoPago.pedidos)
  @JoinColumn({ name: 'id_metodo_pago' })
  metodoPago: MetodoPago;
 
  @OneToMany(() => Detalle_pedido, (detalle) => detalle.pedido)
  detalles: Detalle_pedido[];

  // falta el id del metodo del pago
}
