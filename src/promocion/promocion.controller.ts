import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromocionService } from './promocion.service';
import { PromocionDto } from './promocion.dto';
import { Promocion } from './promocion.entity';

@ApiTags('Promociones')
@Controller('promocion')
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {}

  @Post()
  async create(@Body() promocionDto: PromocionDto): Promise<Promocion> {
    return await this.promocionService.create(promocionDto);
  }

  @Get()
  async findAll(): Promise<Promocion[]> {
    return await this.promocionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Promocion> {
    return await this.promocionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() promocionDto: PromocionDto): Promise<Promocion> {
    return await this.promocionService.update(id, promocionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.promocionService.remove(id);
  }
}
