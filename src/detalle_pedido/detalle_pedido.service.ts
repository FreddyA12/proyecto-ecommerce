import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detalle_pedido } from './detalle_pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { Producto } from 'src/producto/producto.entity';
import { Pedido } from 'src/pedido/pedido.entity';
import { Promocion } from 'src/promocion/promocion.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(Detalle_pedido)
    private detallePedidoRepository: Repository<Detalle_pedido>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Promocion)
    private promocionRepository: Repository<Promocion>  // Agregar esto
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    const producto = await this.productoRepository.findOneBy({ id_producto: createDetallePedidoDto.id_producto });
    const pedido = await this.pedidoRepository.findOneBy({ id_pedido: createDetallePedidoDto.id_pedido });

    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }

    const detalle = new Detalle_pedido();
    detalle.cantidad = createDetallePedidoDto.cantidad;
    detalle.subtotal = createDetallePedidoDto.subtotal;
    detalle.producto = producto;
    detalle.pedido = pedido;

    if (createDetallePedidoDto.id_promocion) {
      const promocion = await this.promocionRepository.findOneBy({ id_promocion: createDetallePedidoDto.id_promocion });
      if (promocion) {
        detalle.promocion = promocion;
      }
    }

    producto.stock -= createDetallePedidoDto.cantidad;
    await this.productoRepository.save(producto);

    return await this.detallePedidoRepository.save(detalle);
  }

  async findAll(): Promise<Detalle_pedido[]> {
    return await this.detallePedidoRepository.find({
      relations: ['producto', 'pedido', 'promocion'],
    });
  }

  async findOne(id: number): Promise<Detalle_pedido> {
    const detalle = await this.detallePedidoRepository.findOne({
      where: { id_detalle_pedido: id },
      relations: ['producto', 'pedido', 'promocion'],
    });

    if (!detalle) {
      throw new Error('Detalle de pedido no encontrado');
    }

    return detalle;
  }

  async update(id: number, updateDetallePedidoDto: CreateDetallePedidoDto): Promise<Detalle_pedido> {
    const detalle = await this.detallePedidoRepository.findOneBy({ id_detalle_pedido: id });
    if (!detalle) {
      throw new Error('Detalle de pedido no encontrado');
    }

    const producto = await this.productoRepository.findOneBy({ id_producto: updateDetallePedidoDto.id_producto });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    // Restaurar stock anterior antes de actualizar
    producto.stock += detalle.cantidad;
    await this.productoRepository.save(producto);

    detalle.cantidad = updateDetallePedidoDto.cantidad;
    detalle.subtotal = updateDetallePedidoDto.subtotal;
    detalle.producto = producto;

    if (updateDetallePedidoDto.id_promocion) {
      const promocion = await this.promocionRepository.findOneBy({ id_promocion: updateDetallePedidoDto.id_promocion });
      if (promocion) {
        detalle.promocion = promocion;
      }
    }

    // Actualizar stock con nueva cantidad
    producto.stock -= updateDetallePedidoDto.cantidad;
    await this.productoRepository.save(producto);

    return await this.detallePedidoRepository.save(detalle);
  }

  async remove(id: number): Promise<void> {
    const detalle = await this.detallePedidoRepository.findOneBy({ id_detalle_pedido: id });
    if (!detalle) {
      throw new Error('Detalle de pedido no encontrado');
    }

    const producto = await this.productoRepository.findOneBy({ id_producto: detalle.producto.id_producto });
    if (producto) {
      producto.stock += detalle.cantidad;
      await this.productoRepository.save(producto);
    }

    await this.detallePedidoRepository.remove(detalle);
  }
}
