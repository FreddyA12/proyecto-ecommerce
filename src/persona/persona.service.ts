import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoIdentificacion } from 'src/tipo-identificacion/tipo-identificacion.entity';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';

@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Persona)
        private personaRepository: Repository<Persona>,
        @InjectRepository(TipoIdentificacion)
        private tipoIdentificacionRepository: Repository<TipoIdentificacion> // Inyección del repositorio de TipoIdentificacion
    ) {}

    async create(persona: Persona): Promise<Persona> {
        if (persona.tipoIdentificacion && persona.tipoIdentificacion.id_tipo_identificacion) {
            const exists = await this.tipoIdentificacionRepository.findOneBy({
                id_tipo_identificacion: persona.tipoIdentificacion.id_tipo_identificacion
            });

            if (!exists) {
                throw new BadRequestException(`El tipo de identificación con ID ${persona.tipoIdentificacion.id_tipo_identificacion} no existe`);
            }
        } else {
            throw new BadRequestException('Debe proporcionar un tipo de identificación válido');
        }

        try {
            return await this.personaRepository.save(persona);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear la persona');
        }
    }
    async remove(id: number): Promise<void> {
        try {
            const result = await this.personaRepository.softDelete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`No se encontró la persona con ID ${id} para eliminar`);
            }
        } catch (error) {
            throw new InternalServerErrorException('Error al eliminar la persona');
        }
    }
    
    async findAll(): Promise<Persona[]> {
        try {
            return await this.personaRepository.find({ relations: ['tipoIdentificacion', 'usuario'] });
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener las personas');
        }
    }

    async findOne(id: number): Promise<Persona> {
        try {
            const persona = await this.personaRepository.findOne({
                where: { id_persona: id },
                relations: ['tipoIdentificacion', 'usuario']
            });
            if (!persona) {
                throw new NotFoundException(`No se encontró la persona con ID ${id}`);
            }
            return persona;
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar la persona');
        }
    }
    async update(id: number, persona: Partial<Persona>): Promise<Persona> {
        // Verificación del Tipo de Identificación
        if (persona.tipoIdentificacion && persona.tipoIdentificacion.id_tipo_identificacion) {
            const exists = await this.tipoIdentificacionRepository.findOneBy({
                id_tipo_identificacion: persona.tipoIdentificacion.id_tipo_identificacion
            });

            if (!exists) {
                throw new BadRequestException(`El tipo de identificación con ID ${persona.tipoIdentificacion.id_tipo_identificacion} no existe`);
            }
        }

        try {
            await this.personaRepository.update(id, persona);
            const updatedPersona = await this.findOne(id);
            if (!updatedPersona) {
                throw new NotFoundException(`No se encontró la persona con ID ${id} para actualizar`);
            }
            return updatedPersona;
        } catch (error) {
            throw new InternalServerErrorException('Error al actualizar la persona');
        }
    }
}
