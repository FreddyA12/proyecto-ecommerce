import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductDto, UpdateProductDto } from './producto.dto';
import { Categoria } from 'src/categoria/categoria.entity';
import { Marca } from 'src/marca/marca.entity';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private productRepository: Repository<Producto>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        @InjectRepository(Marca)
        private marcaRepository: Repository<Marca>
      ) {}

      async create(createProductDto: CreateProductDto): Promise<Producto> {
        // Verificar si la categoría existe
        const categoria = await this.categoriaRepository.findOneBy({ id_categoria: createProductDto.id_categoria });
        if (!categoria) {
            throw new NotFoundException(`La categoría con ID ${createProductDto.id_categoria} no existe`);
 
        }
      
        // Verificar si la marca existe
        const marca = await this.marcaRepository.findOneBy({ id_marca: createProductDto.id_marca });
        if (!marca) {
            throw new NotFoundException(`La marca con ID ${createProductDto.id_marca} no existe`);
        }
      
        // Si ambos existen, crear el producto
        const product = this.productRepository.create(createProductDto);
        product.categoria = categoria;
        product.marca = marca;
        return this.productRepository.save(product);
      }
    
      async findAll(): Promise<Producto[]> {
        return this.productRepository.find({ relations: ['categoria', 'marca', 'detalles', 'devoluciones'] });
      }
    
      async findOne(id: number): Promise<Producto> {
        try {
          const producto = await this.productRepository.findOne({
            where: { id_producto: id },
            relations: ['categoria', 'marca', 'detalles', 'devoluciones']
          });
      
          if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
          }
      
          return producto;
        } catch (error) {
          console.error('Error al encontrar el producto:', error);
          throw new NotFoundException(`Error al eliminar, es posible que tenga relaciones`);
        }
      }
      
      
    
      async update(id: number, updateProductDto: UpdateProductDto): Promise<Producto> {
        // Obtener el producto existente
        const product = await this.productRepository.findOneBy({ id_producto: id });
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
      
        // Verificar si la categoría ha sido actualizada y existe
        if (updateProductDto.id_categoria !== undefined) {
          const categoria = await this.categoriaRepository.findOneBy({ id_categoria: updateProductDto.id_categoria });
          if (!categoria) {
            throw new NotFoundException(`Categoría con ID ${updateProductDto.id_categoria} no encontrada`);
      
        }
          product.categoria = categoria;
        }
      
        // Verificar si la marca ha sido actualizada y existe
        if (updateProductDto.id_marca !== undefined) {
          const marca = await this.marcaRepository.findOneBy({ id_marca: updateProductDto.id_marca });
          if (!marca) {
           
            throw new NotFoundException(`Marca con ID ${updateProductDto.id_marca} no encontrada`);
        }
          product.marca = marca;
        }
      
        // Actualizar las propiedades del producto
        this.productRepository.merge(product, updateProductDto);
        return this.productRepository.save(product);
      }
      
    
      async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
      }
}
