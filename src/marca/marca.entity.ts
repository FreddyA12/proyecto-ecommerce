import { Producto } from 'src/producto/producto.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id_marca: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Producto, producto => producto.categoria, {
  })
  productos: Producto[];
}
