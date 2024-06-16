import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Carrito } from './carrito.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarritoDto } from './carrito.dto';
import { escape } from 'querystring';

@Injectable()
export class CarritoService {

    constructor(
        @InjectRepository(Carrito)
        private carritoRepository: Repository<Carrito>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        
      ) {}

    async create (carritodto:CarritoDto): Promise<Carrito>{
        try {
            const usuario  = await this.usuarioRepository.findOneBy({ id_usuario: carritodto.id_usuario });
            
            if (!usuario) {
                throw new NotFoundException('Usuario not found');
            }
    
            const carrito = this.carritoRepository.create({
                ...carritodto,
                usuario: usuario,
            });
    
            await this.carritoRepository.save(carrito);
    
            return await this.carritoRepository.findOne({
                where: { id_carrito: carrito.id_carrito },
                relations: ['usuario'],
            });
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw new BadRequestException('Error al crear el carrito');
        }
    }

     // Obtener todas

     async findAll(): Promise<Carrito[]> {
        try {
            return await this.carritoRepository.find({
                relations: ['usuario'],
            });
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw new InternalServerErrorException('Error al obtener todos los carritos');
        }
    }


    // obtener por id

    async findOne(id_carrito: number): Promise<Carrito> {
        try {
            const carrito = await this.carritoRepository.findOne({
                where: { id_carrito },
                relations: ['usuario'],
            });
    
            if (!carrito) {
                throw new NotFoundException(`Carrito con ID ${id_carrito} no encontrada`);
            }
    
            return carrito;
        } catch (error) {
            console.error('Error al encontrar el carrito:', error);
            throw new NotFoundException(`Error al encontrar el carrito, es posible que tenga relaciones`);
        }
    }

    // actualizar 

    async update(id_carrito: number, carritoDto: CarritoDto): Promise<Carrito> {
        const carrito = await this.carritoRepository.findOne({
            where: { id_carrito: id_carrito },
            relations: ['usuario']
        });
    
        if (!carrito) {
            throw new NotFoundException(`Carrito con ID ${id_carrito} no encontrado`);
        }
    
        if (carrito.usuario.id_usuario !== carritoDto.id_usuario) {
            const usuario = await this.usuarioRepository.findOneBy({ id_usuario: carritoDto.id_usuario });
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }
            carrito.usuario = usuario;
        }
    
        carrito.total = carritoDto.total;
        carrito.estado = carritoDto.estado;
    
        await this.carritoRepository.save(carrito);
    
        return carrito;
    }
    
    
    

    //eliminar 

    async delete(id_carrito:number): Promise<void>{
        const carrito = await this.carritoRepository.findOneBy({ id_carrito }); 
        if (!carrito) {
            throw new Error('Carrito not found');
        }
        await this.carritoRepository.remove(carrito);
    }
}
