import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])], // Registra la entidad Pedido con TypeORM
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [TypeOrmModule]
})
export class PedidoModule {}
