import { Detalle_pedido } from 'src/detalle_pedido/detalle_pedido.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('promociones')
export class Promocion {
  @PrimaryGeneratedColumn()
  id_promocion: number;

  @Column()
  descuento: number;

  @Column()
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_fin: Date;

  @Column()
  estado: string;  // Puede ser 'activo' o 'no activo'

  @OneToMany(() => Detalle_pedido, (detalle) => detalle.promocion)
  detalles: Detalle_pedido[];
}
