import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { Carrito } from './carrito.entity';
import { Usuario } from '../usuario/usuario.entity'; // Asegúrate de que la ruta es correcta

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, Usuario])],
  providers: [CarritoService],
  exports: [CarritoService], // Exporta el servicio si es necesario en otros módulos
})
export class CarritoModule {}
