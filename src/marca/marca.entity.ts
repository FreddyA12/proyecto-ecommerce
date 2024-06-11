import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marcas')
export class marca {
  @PrimaryGeneratedColumn()
  id_marca: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;
}
