import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { Devolucion } from './devolucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevolucionDto } from './dto/devolucion.dto';
import { Pedido } from 'src/pedido/pedido.entity';
import { Producto } from 'src/producto/producto.entity';

@Injectable()
export class DevolucionService {

    constructor(
        @InjectRepository(Devolucion)
        private devolucionRepository: Repository<Devolucion>,
        @InjectRepository(Pedido)
        private pedidoRepository: Repository<Pedido>,
        @InjectRepository(Producto)
        private productoRepository: Repository<Producto>,
      ) {}

    // Crear devolucion
    async create(devolucionDto: DevolucionDto): Promise<Devolucion> {
        try {
            const pedido = await this.pedidoRepository.findOneBy({ id_pedido: devolucionDto.id_pedido });
            const producto = await this.productoRepository.findOneBy({ id_producto: devolucionDto.id_producto });
    
            if (!pedido || !producto) {
                throw new NotFoundException('Pedido o Producto no encontrado');
            }
    
            const devolucion = this.devolucionRepository.create({
                ...devolucionDto,
                pedido: pedido,
                producto: producto,
            });
    
            const savedDevolucion = await this.devolucionRepository.save(devolucion);
    
            // Actualiza el stock del producto
            producto.stock += devolucionDto.cantidad;
            await this.productoRepository.save(producto);
    
            return await this.devolucionRepository.findOne({
                where: { id_devolucion: savedDevolucion.id_devolucion },
                relations: ['pedido', 'producto'],
            });
        } catch (error) {
            console.error('Error al crear la devolución:', error);
            throw new BadRequestException('Error al crear la devolución');
        }
    }
    
    

    // Obtener todas

    async findAll(): Promise<Devolucion[]> {
        try {
            return await this.devolucionRepository.find({
                relations: ['pedido', 'producto'],
            });
        } catch (error) {
            console.error('Error al obtener todas las devoluciones:', error);
            throw new InternalServerErrorException('Error al obtener todas las devoluciones');
        }
    }


    // obtener por id

    async findOne(id_devolucion: number): Promise<Devolucion> {
        try {
            const devolucion = await this.devolucionRepository.findOne({
                where: { id_devolucion },
                relations: ['pedido', 'producto'],
            });
    
            if (!devolucion) {
                throw new NotFoundException(`Devolución con ID ${id_devolucion} no encontrada`);
            }
    
            return devolucion;
        } catch (error) {
            console.error('Error al encontrar la devolución:', error);
            throw new NotFoundException(`Error al encontrar la devolución, es posible que tenga relaciones`);
        }
    }
    


    // actualizar 

    async update(id_devolucion: number, devolucionDto: DevolucionDto): Promise<Devolucion> {
        try {
            const devolucion = await this.devolucionRepository.findOne({ where: { id_devolucion } });
            if (!devolucion) {
                throw new NotFoundException('Devolución no encontrada');
            }

            const pedido = await this.pedidoRepository.findOne({ where: { id_pedido: devolucionDto.id_pedido } });
            const producto = await this.productoRepository.findOne({ where: { id_producto: devolucionDto.id_producto } });

            if (!pedido || !producto) {
                throw new NotFoundException('Pedido o Producto no encontrado');
            }

            devolucion.pedido = pedido;
            devolucion.producto = producto;
            devolucion.motivo = devolucionDto.motivo;
            devolucion.cantidad = devolucionDto.cantidad;
            devolucion.fecha_devolucion = new Date(devolucionDto.fecha_devolucion);

            await this.devolucionRepository.save(devolucion);

            return await this.devolucionRepository.findOne({
                where: { id_devolucion },
                relations: ['pedido', 'producto'],
            });
        } catch (error) {
            console.error('Error al actualizar la devolución:', error);
            throw new InternalServerErrorException('Error al actualizar la devolución');
        }
    }
    
    

    //eliminar 

    async delete(id_devolucion: number): Promise<void> {
        const devolucion = await this.devolucionRepository.findOneBy({ id_devolucion });
        if (!devolucion) {
            throw new Error('Devolución no encontrada');
        }
    
        const producto = await this.productoRepository.findOneBy({ id_producto: devolucion.producto.id_producto });
        if (producto) {
            producto.stock -= devolucion.cantidad;
            await this.productoRepository.save(producto);
        }
    
        await this.devolucionRepository.remove(devolucion);
    }
    


}
