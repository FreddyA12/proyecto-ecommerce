import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoIdentificacion } from './tipo-identificacion.entity';

@Injectable()
export class TipoIdentificacionService {
    constructor(
        @InjectRepository(TipoIdentificacion)
        private tipoIdentificacionRepository: Repository<TipoIdentificacion>,
    ) {}

    async findAll(): Promise<TipoIdentificacion[]> {
        try {
            return await this.tipoIdentificacionRepository.find();
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los tipos de identificación');
        }
    }

    async findOne(id: number): Promise<TipoIdentificacion> {
        try {
            const tipoIdentificacion = await this.tipoIdentificacionRepository.findOneBy({id_tipo_identificacion: id});
            if (!tipoIdentificacion) {
                throw new NotFoundException(`No se encontró el tipo de identificación con ID ${id}`);
            }
            return tipoIdentificacion;
        } catch (error) {
            if (error.status === 404) {
                throw error;
            }
            throw new InternalServerErrorException('Error al buscar el tipo de identificación');
        }
    }

    async create(tipoIdentificacion: TipoIdentificacion): Promise<TipoIdentificacion> {
        try {
            return await this.tipoIdentificacionRepository.save(tipoIdentificacion);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el tipo de identificación');
        }
    }

    async update(id: number, tipoIdentificacion: Partial<TipoIdentificacion>): Promise<TipoIdentificacion> {
        try {
            await this.tipoIdentificacionRepository.update(id, tipoIdentificacion);
            return this.findOne(id);
        } catch (error) {
            throw new InternalServerErrorException('Error al actualizar el tipo de identificación');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const result = await this.tipoIdentificacionRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`No se encontró el tipo de identificación con ID ${id} para eliminar`);
            }
        } catch (error) {
            if (error.status === 404) {
                throw error;
            }
            throw new InternalServerErrorException('Error al eliminar el tipo de identificación');
        }
    }
}
