import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/pedido.dto';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
      ) {}

    // Crear una nueva factura
    async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
        const pedido = new Pedido();
        // Asegúrate de que la fecha sea un objeto Date
        pedido.fecha = new Date(createPedidoDto.fecha);
        pedido.total = createPedidoDto.total;

        return await this.pedidoRepository.save(pedido);
    }
    

  // Encontrar todas las facturas
  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  // Encontrar una factura por ID
  async findOne(id: number): Promise<Pedido> {
    return await this.pedidoRepository.findOne({ where: { id_pedido: id } });
    }   

  

  // Eliminar una factura
  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    if (!pedido) {
      throw new Error('Pedido no encontrada');
    }
    await this.pedidoRepository.remove(pedido);
  }
}
