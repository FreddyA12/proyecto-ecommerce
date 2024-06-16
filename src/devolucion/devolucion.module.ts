import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolucion } from './devolucion.entity';
import { DevolucionService } from './devolucion.service';
import { DevolucionController } from './devolucion.controller';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Devolucion]),
        PedidoModule,
        ProductoModule, // Asegúrate de que PedidoModule esté importado aquí
      ],
      providers: [DevolucionService],
      controllers: [DevolucionController],
})
export class DevolucionModule {}
