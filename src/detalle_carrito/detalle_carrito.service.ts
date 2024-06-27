import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCarrito } from './detalle_carrito.entity';
import { CreateDetalleCarritoDto } from './create-detalle_carrito.dto';
import { Producto } from '../producto/producto.entity';
import { Carrito } from '../carrito/carrito.entity';

@Injectable()
export class DetalleCarritoService {
  constructor(
    @InjectRepository(DetalleCarrito)
    private readonly detalleCarritoRepository: Repository<DetalleCarrito>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
  ) {}

  async create(createDetalleCarritoDTO: CreateDetalleCarritoDto): Promise<DetalleCarrito> {
    const { id_carrito, cantidad, subtotal, id_producto } = createDetalleCarritoDTO;

    const carrito = await this.carritoRepository.findOne({ where: { id_carrito } });
    if (!carrito) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const producto = await this.productoRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    const nuevoDetalle = this.detalleCarritoRepository.create({
      cantidad,
      subtotal,
      carrito,
      producto
    });

    try {
      return await this.detalleCarritoRepository.save(nuevoDetalle);
    } catch (error) {
      throw new InternalServerErrorException('Error creando el detalle del carrito');
    }
  }

  async findAll(): Promise<DetalleCarrito[]> {
    try {
      return await this.detalleCarritoRepository.find({ relations: ['carrito', 'producto'] });
    } catch (error) {
      throw new InternalServerErrorException('Error obteniendo los detalles del carrito');
    }
  }

  async findOne(id: number): Promise<DetalleCarrito> {
    try {
      const detalle = await this.detalleCarritoRepository.findOne({ where: { id_detalles_carrito: id }, relations: ['carrito', 'producto'] });
      if (!detalle) {
        throw new NotFoundException('Detalle del carrito no encontrado');
      }
      return detalle;
    } catch (error) {
      throw new InternalServerErrorException('Error obteniendo el detalle del carrito');
    }
  }

  async update(id: number, updateDetalleCarritoDTO: CreateDetalleCarritoDto): Promise<DetalleCarrito> {
    const detalle = await this.detalleCarritoRepository.findOne({ where: { id_detalles_carrito: id } });
    if (!detalle) {
      throw new NotFoundException('Detalle del carrito no encontrado');
    }

    const producto = await this.productoRepository.findOne({ where: { id_producto: updateDetalleCarritoDTO.id_producto } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    detalle.cantidad = updateDetalleCarritoDTO.cantidad;
    detalle.subtotal = updateDetalleCarritoDTO.subtotal;
    detalle.producto = producto;

    try {
      return await this.detalleCarritoRepository.save(detalle);
    } catch (error) {
      throw new InternalServerErrorException('Error actualizando el detalle del carrito');
    }
  }

  async remove(id: number): Promise<void> {
    const detalle = await this.detalleCarritoRepository.findOne({ where: { id_detalles_carrito: id } });
    if (!detalle) {
      throw new NotFoundException('Detalle del carrito no encontrado');
    }

    try {
      await this.detalleCarritoRepository.remove(detalle);
    } catch (error) {
      throw new InternalServerErrorException('Error eliminando el detalle del carrito');
    }
  }
}
