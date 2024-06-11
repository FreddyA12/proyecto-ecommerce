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
}
