import { Injectable, } from '@nestjs/common';
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
    async create(devolucionDto: DevolucionDto): Promise<Devolucion>{
        const devolucion= this.devolucionRepository.create(devolucionDto);
        return await this.devolucionRepository.save(devolucion);
    }

    // Obtener todas

    async findAll(): Promise<Devolucion[]>{
        return await this.devolucionRepository.find();
    }


    // obtener por id

    async findOne(id_devolucion: number): Promise<Devolucion>{
        const devolucion = await this.devolucionRepository.findOne({ where: { id_devolucion } });
        if (!devolucion) {
            throw new Error('Devolucion not found');
        }
        return devolucion;
    }


    // actualizar 

    async update (id_devolucion:number, devolucionDto:DevolucionDto): Promise<Devolucion>{
        const devolucion = await this.devolucionRepository.findOneBy({ id_devolucion }); 
        if (!devolucion) {
            throw new Error('Devolucion not found');
        }
        const pedido = await this.pedidoRepository.findOneBy({ id_pedido: devolucionDto.id_pedido });
        const producto = await this.productoRepository.findOneBy({ id_producto: devolucionDto.id_producto });

        if (!pedido || !producto) {
            throw new Error('Pedido or Producto not found');
        }

        devolucion.pedido = pedido;
        devolucion.producto = producto;
        devolucion.motivo = devolucionDto.motivo;
        devolucion.cantidad = devolucionDto.cantidad;
        devolucion.fecha_devolucion = new Date(devolucionDto.fecha_devolucion);

        await this.devolucionRepository.save(devolucion);
        
        return devolucion;


    }

    //eliminar 

    async delete(id_devolucion:number): Promise<void>{
        const devolucion = await this.devolucionRepository.findOneBy({ id_devolucion }); 
        if (!devolucion) {
            throw new Error('Devolucion not found');
        }
        await this.devolucionRepository.remove(devolucion);
    }


}
