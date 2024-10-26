import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
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
    @ApiProperty()
    @IsDefined({ message: 'El campo idCliente debe estar definido' })
    @IsNumber({}, { message: 'El campo idCliente debe ser tipo numérico' })
    readonly idCliente: number;
    @ApiProperty()
    @IsDefined({ message: 'El campo idEmpleado debe estar definido' })
    @IsNumber({}, { message: 'El campo idEmpleado debe ser tipo numérico' })
    readonly idEmpleado: number;
}
