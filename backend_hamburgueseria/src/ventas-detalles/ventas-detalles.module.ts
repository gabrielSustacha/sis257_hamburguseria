import { Module } from '@nestjs/common';
import { VentasDetalleService } from './ventas-detalles.service';
import { VentasDetallesController } from './ventas-detalles.controller';
import { VentaDetalle } from './entities/ventas-detalle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VentaDetalle])],
  controllers: [VentasDetallesController],
  providers: [VentasDetalleService],
})
export class VentasDetallesModule {}
