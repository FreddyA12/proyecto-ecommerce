import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './facturas.entity';
import { Repository } from 'typeorm';
import { CreateFacturaDto, UpdateFacturaDto } from './dto/facturas.dto';

@Injectable()
export class FacturasService {
    constructor(
        @InjectRepository(Factura)
        private facturasRepository: Repository<Factura>,
      ) {}

    // Crear una nueva factura
    async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
        const factura = new Factura();
        // Asegúrate de que la fecha sea un objeto Date
        factura.fecha_factura = new Date(createFacturaDto.fecha_factura);
        factura.total = createFacturaDto.total;

        return await this.facturasRepository.save(factura);
    }
    

  // Encontrar todas las facturas
  findAll(): Promise<Factura[]> {
    return this.facturasRepository.find();
  }

  // Encontrar una factura por ID
  async findOne(id: number): Promise<Factura> {
    return await this.facturasRepository.findOne({ where: { id_factura: id } });
    }   

  // Actualizar una factura
  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.facturasRepository.preload({
      id_factura: id,
      ...updateFacturaDto,
    });
    if (!factura) {
      throw new Error('Factura no encontrada');
    }
    return this.facturasRepository.save(factura);
  }

  // Eliminar una factura
  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    if (!factura) {
      throw new Error('Factura no encontrada');
    }
    await this.facturasRepository.remove(factura);
  }
}
