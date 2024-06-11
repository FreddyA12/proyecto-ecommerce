import { Pedido } from "src/pedido/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('metodos_pagos')
export class MetodoPago {
    @PrimaryGeneratedColumn()
    id_metodo_pago: number;

    @Column()
    nombre: string;

    @OneToMany(() => Pedido, pedido => pedido.metodoPago)
    pedidos: Pedido[];
}