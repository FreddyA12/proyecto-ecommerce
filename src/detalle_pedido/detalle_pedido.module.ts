import { Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';

@Module({
  providers: [DetallePedidoService],
  controllers: [DetallePedidoController]
})
export class DetallePedidoModule {}
