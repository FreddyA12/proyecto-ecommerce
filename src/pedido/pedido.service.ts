import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/pedido.dto';
import { Usuario } from 'src/usuario/usuario.entity';
import { MetodoPago } from 'src/metodo-pago/metodo-pago.entity';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(MetodoPago)
        private metodoPagoRepository: Repository<MetodoPago>
      ) {}

    // Crear una nueva factura
    async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
      const pedido = new Pedido();
      pedido.fecha = new Date(createPedidoDto.fecha);
      pedido.total = createPedidoDto.total;
      pedido.estado = createPedidoDto.estado;
      pedido.subtotal = createPedidoDto.subtotal;
  
      // Obtener el objeto usuario utilizando el ID
      const usuario = await this.usuarioRepository.findOneBy({ id_usuario: createPedidoDto.id_usuario });
      if (!usuario) {
          throw new Error('Usuario no encontrado');
      }
      pedido.usuario = usuario;
  
      // Asumiendo que tienes un repositorio para Método de Pago similar al de Usuario
      const metodoPago = await this.metodoPagoRepository.findOneBy({ id_metodo_pago: createPedidoDto.id_metodo_pago });
      if (!metodoPago) {
          throw new Error('Método de pago no encontrado');
      }
      pedido.metodoPago = metodoPago;
  
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

  //actualizar pedido
  async update(id_pedido: number, createPedidoDto: CreatePedidoDto): Promise<Pedido>{
    const pedido= await this.pedidoRepository.findOneBy({id_pedido});
    if (!pedido) {
      throw new Error('Pedido not found');
    }
    // Fusionar los cambios del DTO con la entidad existente
    this.pedidoRepository.merge(pedido, createPedidoDto);
    
    // Guardar la entidad actualizada en la base de datos
    return await this.pedidoRepository.save(pedido);
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
