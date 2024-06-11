import { Producto } from 'src/producto/producto.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre: string;

  @OneToMany(() => Producto, producto => producto.categoria, {
  })
  productos: Producto[];
  
}
