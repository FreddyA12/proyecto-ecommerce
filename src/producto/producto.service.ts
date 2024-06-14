import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto)
        private productoRepository: Repository<Producto>

    ){}

    // Crear devolucion
    

    // Obtener todas

    async findAll(): Promise<Producto[]>{
        return await this.productoRepository.find();
    }
}
