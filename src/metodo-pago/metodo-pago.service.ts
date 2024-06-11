import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetodoPago } from './metodo-pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetodoPagoService {
    constructor(
        @InjectRepository(MetodoPago)
        private metodoRepository: Repository<MetodoPago>,
      ) {}

    // Crear una nueva factura
    async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
        const pedido = new Pedido();
        // Asegúrate de que la fecha sea un objeto Date
        pedido.fecha = new Date(createPedidoDto.fecha);
        pedido.total = createPedidoDto.total;

        return await this.pedidoRepository.save(pedido);
    }
}
