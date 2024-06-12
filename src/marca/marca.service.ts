import { Injectable, NotFoundException } from '@nestjs/common';
import { Marca } from './marca.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { createMarcaDTO } from './create-marca-dto';

@Injectable()
export class MarcaService {

    constructor(
        @InjectRepository(Marca)
        private readonly marcaRepository: Repository<Marca>,
    ) {}

    async create(createMarcaDTO: any): Promise<Marca> {
        
        return await this.marcaRepository.save(createMarcaDTO);
    }

    async findAll(): Promise<Marca[]> {
        return await this.marcaRepository.find({ relations: ['productos'] });
    }

    async findOne(id: number): Promise<Marca> {
        const marca = await this.marcaRepository.findOne({
          where: { id_marca: id }, // Asegúrate de que id_marca es el nombre correcto de la columna
          relations: ['productos']
        });
        if (!marca) {
          throw new NotFoundException(`Marca with ID "${id}" not found`);
        }
        return marca;
      }
      

    async update(id: number, updateCategoriaDto: createMarcaDTO): Promise<Marca> {
        const marca = await this.findOne(id);
        this.marcaRepository.merge(marca, updateCategoriaDto);
        return await this.marcaRepository.save(marca);
    }

    async remove(id: number): Promise<void> {
        const marca = await this.findOne(id);
        await this.marcaRepository.remove(marca);
    }
}
