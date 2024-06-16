import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCarrito } from './detalle_carrito.entity';
import { CreateDetalleCarritoDTO } from './create-detalle_carrito-dto';
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
    private readonly carritoRepository: Repository<Carrito>
  ) {}

  async create(createDetalleCarritoDTO: CreateDetalleCarritoDTO): Promise<DetalleCarrito> {
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
      productos: [producto]
    });

    try {
      return await this.detalleCarritoRepository.save(nuevoDetalle);
    } catch (error) {
      throw new InternalServerErrorException('Error creando el detalle del carrito');
    }
  }

  async findAll(): Promise<DetalleCarrito[]> {
    try {
      return await this.detalleCarritoRepository.find({ relations: ['productos', 'carrito'] });
    } catch (error) {
      throw new InternalServerErrorException('Error recuperando los detalles del carrito');
    }
  }

  async findOne(id: number): Promise<DetalleCarrito> {
    const detalle = await this.detalleCarritoRepository.findOne({
      where: { id_detalles_carrito: id },
      relations: ['productos', 'carrito']
    });
    if (!detalle) {
      throw new NotFoundException(`Detalle del carrito con ID "${id}" no encontrado`);
    }
    return detalle;
  }

  async update(id: number, updateDetalleCarritoDto: CreateDetalleCarritoDTO): Promise<DetalleCarrito> {
    let detalle = await this.findOne(id);
    const { id_carrito, cantidad, subtotal, id_producto } = updateDetalleCarritoDto;

    const carrito = await this.carritoRepository.findOne({ where: { id_carrito } });
    if (!carrito) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const producto = await this.productoRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    detalle.cantidad = cantidad;
    detalle.subtotal = subtotal;
    detalle.carrito = carrito;
    detalle.productos = [producto];

    try {
      return await this.detalleCarritoRepository.save(detalle);
    } catch (error) {
      throw new InternalServerErrorException(`Error actualizando el detalle del carrito con ID "${id}"`);
    }
  }

  async remove(id: number): Promise<void> {
    let detalle = await this.findOne(id);
    try {
      await this.detalleCarritoRepository.remove(detalle);
    } catch (error) {
      throw new InternalServerErrorException(`Error en la eliminación, es posible que tenga relaciones`);
    }
  }
}
