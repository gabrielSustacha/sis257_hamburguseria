import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateDetallePedidoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cantidad es obligatorio' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo número' })
    @Min(1, { message: 'La cantidad debe ser al menos 1' })
    readonly cantidad: number;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precioUnitario es obligatorio' })
    @IsNumber({}, { message: 'El campo precioUnitario debe ser de tipo número' })
    @Min(0, { message: 'El precio unitario no puede ser negativo' })
    readonly precioUnitario: number;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo subtotal es obligatorio' })
    @IsNumber({}, { message: 'El campo subtotal debe ser de tipo número' })
    @Min(0, { message: 'El subtotal no puede ser negativo' })
    readonly subtotal: number;
    @ApiProperty()
    @IsDefined({ message: 'El campo idProducto debe estar definido' })
    @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
    readonly idProducto: number;
    @ApiProperty()
    @IsDefined({ message: 'El campo idProducto debe estar definido' })
    @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
    readonly idPedido: number;
  
}
