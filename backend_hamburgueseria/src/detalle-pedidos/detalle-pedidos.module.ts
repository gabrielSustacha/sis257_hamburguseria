import { Module } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { DetallePedidosController } from './detalle-pedidos.controller';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  controllers: [DetallePedidosController],
  providers: [DetallePedidosService],
})
export class DetallePedidosModule {}
