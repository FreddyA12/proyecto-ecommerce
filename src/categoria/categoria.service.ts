import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
        try {
            return await this.categoriaRepository.save(createCategoriaDto);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear la categoría');
        }
    }

    async findAll(): Promise<Categoria[]> {
        try {
            return await this.categoriaRepository.find({ relations: ['productos'] });
        } catch (error) {
            throw new InternalServerErrorException('Error al recuperar las categorías');
        }
    }

    async findOne(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id_categoria: id }, // Asegúrate de que 'id' es el nombre correcto de la columna
            relations: ['productos']
        });
        if (!categoria) {
            throw new NotFoundException(`Categoría con ID "${id}" no encontrada`);
        }
        return categoria;
    }

    async update(id: number, updateCategoriaDto: any): Promise<Categoria> {
        let categoria = await this.findOne(id);  // Reutiliza findOne para manejar la no existencia de la categoría
        try {
            this.categoriaRepository.merge(categoria, updateCategoriaDto);
            return await this.categoriaRepository.save(categoria);
        } catch (error) {
            throw new InternalServerErrorException(`Error al actualizar la categoría con ID "${id}"`);
        }
    }

    async remove(id: number): Promise<void> {
        let categoria = await this.findOne(id);  // Reutiliza findOne para manejar la no existencia de la categoría
        try {
            await this.categoriaRepository.remove(categoria);
        } catch (error) {
            throw new InternalServerErrorException(`Error al eliminar la categoría con ID "${id}"`);
        }
    }
}
