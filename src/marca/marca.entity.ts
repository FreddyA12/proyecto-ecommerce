import { Producto } from "src/producto/producto.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('marcas') // Asegúrate de que el nombre de la tabla sea correcto
export class Marca {
  @PrimaryGeneratedColumn()
  id_marca: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Producto, producto => producto.marca) // Asegúrate de que la relación esté correctamente mapeada
  productos: Producto[];
}
