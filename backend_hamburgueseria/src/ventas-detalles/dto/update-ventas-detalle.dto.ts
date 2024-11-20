import { PartialType } from '@nestjs/swagger';
import { CreateVentaDetalleDto } from './create-ventas-detalle.dto';

export class UpdateVentasDetalleDto extends PartialType(CreateVentaDetalleDto) {}
