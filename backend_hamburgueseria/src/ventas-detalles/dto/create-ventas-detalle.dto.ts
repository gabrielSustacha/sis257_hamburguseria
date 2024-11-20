import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVentaDetalleDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo idProducto es obligatorio' })
    @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
    readonly idProducto: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cantidad es obligatorio' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
    @Min(1, { message: 'La cantidad debe ser al menos 1' })
    readonly cantidad: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precioUnitario es obligatorio' })
    @IsNumber({}, { message: 'El campo precioUnitario debe ser de tipo numérico' })
    @Min(0, { message: 'El precio unitario no puede ser negativo' })
    readonly precioUnitario: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo total es obligatorio' })
    @IsNumber({}, { message: 'El campo total debe ser de tipo numérico' })
    @Min(0, { message: 'El total no puede ser negativo' })
    readonly total: number;
}
