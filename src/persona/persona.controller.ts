// persona.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './persona.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Personas')
@Controller('personas')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {}

    @Get()
    findAll(): Promise<Persona[]> {
        return this.personaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Persona> {
        return this.personaService.findOne(id);
    }

    @Post()
    create(@Body() persona: Persona): Promise<Persona> {
        return this.personaService.create(persona);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() persona: Partial<Persona>): Promise<Persona> {
        return this.personaService.update(id, persona);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.personaService.remove(id);
    }
}
