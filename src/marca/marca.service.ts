import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

    async create(createMarcaDTO: createMarcaDTO): Promise<Marca> {
        try {
            return await this.marcaRepository.save(createMarcaDTO);
        } catch (error) {
            throw new InternalServerErrorException('Error creando la marca');
        }
    }

    async findAll(): Promise<Marca[]> {
        try {
            return await this.marcaRepository.find({ relations: ['productos'] });
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving brands');
        }
    }

    async findOne(id: number): Promise<Marca> {
        const marca = await this.marcaRepository.findOne({
            where: { id_marca: id }, // Asegúrate de que 'id' es el nombre correcto de la columna
            relations: ['productos']
        });
        if (!marca) {
            throw new NotFoundException(`Marca con ID "${id}" not found`);
        }
        return marca;
    }

    async update(id: number, updateMarcaDto: createMarcaDTO): Promise<Marca> {
        let marca = await this.findOne(id);  // Reutiliza findOne para manejar la no existencia de la marca
        try {
            this.marcaRepository.merge(marca, updateMarcaDto);
            return await this.marcaRepository.save(marca);
        } catch (error) {
            throw new InternalServerErrorException(`Error actualizando la marca con ID "${id}"`);
        }
    }

    async remove(id: number): Promise<void> {
        let marca = await this.findOne(id);  // Reutiliza findOne para manejar la no existencia de la marca
        try {
            await this.marcaRepository.remove(marca);
        } catch (error) {
            throw new InternalServerErrorException(`Error en la eliminacion, es posible que tenga relaciones`);
        }
    }
}
