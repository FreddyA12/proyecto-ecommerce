import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetodoPago } from './metodo-pago.entity';
import { Repository } from 'typeorm';
import { DtoMetodoPago } from './dto/metodo-pago.dto';

@Injectable()
export class MetodoPagoService {
    constructor(
        @InjectRepository(MetodoPago)
        private metodoRepository: Repository<MetodoPago>,
      ) {}

    
    async create(dtoMetodoPago: DtoMetodoPago): Promise<MetodoPago> {
        
        const metodoPago = this.metodoRepository.create(dtoMetodoPago);
        return await this.metodoRepository.save(metodoPago);
    }

    async findAll(): Promise<MetodoPago[]> {
        return await this.metodoRepository.find();
    }

    async findOne(id_metodo_pago: number): Promise<MetodoPago> {
        const metodoPago = await this.metodoRepository.findOne({ where: { id_metodo_pago } });
        if (!metodoPago) {
            throw new Error('MetodoPago not found');
        }
        return metodoPago;
    }
    
    async update(id_metodo_pago: number, dtoMetodoPago: DtoMetodoPago): Promise<MetodoPago> {
        // Find the existing entity
        const metodoPago = await this.metodoRepository.findOne({ where: { id_metodo_pago } });
        if (!metodoPago) {
            throw new Error('MetodoPago not found');
        }

        // Update the entity with new values
        metodoPago.nombre = dtoMetodoPago.nombre;

        // Save the updated entity
        return await this.metodoRepository.save(metodoPago);
    }

    async delete(id_metodo_pago: number): Promise<void>{
        const metodoPago = await this.metodoRepository.findOne({ where: { id_metodo_pago } });
        if (!metodoPago) {
            throw new Error('MetodoPago not found');
        }

        await this.metodoRepository.remove(metodoPago);
    }
}
