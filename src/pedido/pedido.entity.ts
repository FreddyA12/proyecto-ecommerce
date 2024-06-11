import { MetodoPago } from 'src/metodo-pago/metodo-pago.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pedidos') // aquí va el nombre de la tabla de la base
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column({ type: 'timestamp' })  // Asegúrate de que el tipo coincida con el uso en el servicio
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
}
