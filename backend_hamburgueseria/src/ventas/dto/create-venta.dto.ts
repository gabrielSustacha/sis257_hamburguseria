import { IsNotEmpty, IsNumber, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVentaDetalleDto } from './create-venta-detalle.dto';

export class CreateVentaDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idCliente: number;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateVentaDetalleDto)
    readonly ventaDetalleDto: CreateVentaDetalleDto[];
}
