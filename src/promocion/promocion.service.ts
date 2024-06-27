import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from './promocion.entity';
import { PromocionDto } from './promocion.dto';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private promocionRepository: Repository<Promocion>
  ) {}

  // Crear una nueva promoción
  async create(promocionDto: PromocionDto): Promise<Promocion> {
    try {
      const promocion = this.promocionRepository.create(promocionDto);
      promocion.estado = this.calculateEstado(promocion.fecha_inicio, promocion.fecha_fin);
      return await this.promocionRepository.save(promocion);
    } catch (error) {
      throw new BadRequestException('Error al crear la promoción');
    }
  }

  // Obtener todas las promociones
  async findAll(): Promise<Promocion[]> {
    try {
      return await this.promocionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener todas las promociones');
    }
  }

  // Obtener una promoción por ID
  async findOne(id: number): Promise<Promocion> {
    try {
      const promocion = await this.promocionRepository.findOneBy({ id_promocion: id });
      if (!promocion) {
        throw new NotFoundException('Promoción no encontrada');
      }
      return promocion;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la promoción');
    }
  }

  // Actualizar una promoción
  async update(id: number, promocionDto: PromocionDto): Promise<Promocion> {
    try {
      const promocion = await this.promocionRepository.findOneBy({ id_promocion: id });
      if (!promocion) {
        throw new NotFoundException('Promoción no encontrada');
      }

      Object.assign(promocion, promocionDto);
      promocion.estado = this.calculateEstado(promocion.fecha_inicio, promocion.fecha_fin);
      return await this.promocionRepository.save(promocion);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la promoción');
    }
  }

  // Eliminar una promoción
  async remove(id: number): Promise<void> {
    try {
      const promocion = await this.promocionRepository.findOneBy({ id_promocion: id });
      if (!promocion) {
        throw new NotFoundException('Promoción no encontrada');
      }
      await this.promocionRepository.remove(promocion);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la promoción');
    }
  }

  private calculateEstado(fecha_inicio: Date, fecha_fin: Date): string {
    const currentDate = new Date();
    if (currentDate >= fecha_inicio && currentDate <= fecha_fin) {
      return 'activo';
    }
    return 'no activo';
  }
}
