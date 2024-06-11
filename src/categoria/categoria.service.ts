import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {}

    async create(createCategoriaDto: any): Promise<Categoria> {
        
        return await this.categoriaRepository.save(createCategoriaDto);
    }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({ relations: ['productos'] });
    }

    async findOne(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id },
            relations: ['productos']
        });
        if (!categoria) {
            throw new NotFoundException(`Categoria with ID "${id}" not found`);
        }
        return categoria;
    }

    async update(id: number, updateCategoriaDto: any): Promise<Categoria> {
        const categoria = await this.findOne(id);
        this.categoriaRepository.merge(categoria, updateCategoriaDto);
        return await this.categoriaRepository.save(categoria);
    }

    async remove(id: number): Promise<void> {
        const categoria = await this.findOne(id);
        await this.categoriaRepository.remove(categoria);
    }
}
