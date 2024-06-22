import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany,JoinTable, OneToMany } from 'typeorm';
import { Persona } from '../persona/persona.entity';
import { Pedido } from 'src/pedido/pedido.entity';
import { Rol } from 'src/rol/rol.entity';
import { Carrito } from 'src/carrito/carrito.entity';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_usuario: string;

  @Column()
  password: string;

  @OneToOne(() => Persona, persona => persona.usuario, { cascade: true })
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @Column()
  fecha_registro: Date;

  @Column()
  estado_usuario: string;

  @Column()
  eliminado: boolean;

  @Column()
  fecha_ultima_conexion: Date;

  @ManyToMany(() => Rol, rol => rol.usuarios)
  @JoinTable({ name: 'usuarios_roles' }) 
  roles: Rol[];

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @OneToOne(()=>Carrito, carrito=> carrito.usuario)
  carrito:Carrito;
}
