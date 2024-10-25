import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
enum EstadoPedido {
    PENDIENTE = 'pendiente',
    COMPLETADO = 'completado',
    CANCELADO = 'cancelado',
  }
export class CreatePedidoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo metodoPago es obligatorio' })
    @IsString({ message: 'El campo metodoPago debe ser de tipo cadena' })
    readonly metodoPago: string;
  
    @ApiProperty({ enum: EstadoPedido })
    @IsNotEmpty({ message: 'El campo estado es obligatorio' })
    @IsEnum(EstadoPedido, {
      message: 'El estado debe ser pendiente, completado o cancelado',
    })
    readonly estado: EstadoPedido;
}
