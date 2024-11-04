import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePedidoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo metodoPago es obligatorio' })
    @IsString({ message: 'El campo metodoPago debe ser de tipo cadena' })
    readonly metodoPago: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo estado es obligatorio' })
    @IsString({ message: 'El campo estado debe ser de tipo cadena' })
    readonly estado: string;
  
  
    @ApiProperty()
    @IsDefined({ message: 'El campo idCliente debe estar definido' })
    @IsNumber({}, { message: 'El campo idCliente debe ser tipo numérico' })
    readonly idCliente: number;
    @ApiProperty()
    @IsDefined({ message: 'El campo idEmpleado debe estar definido' })
    @IsNumber({}, { message: 'El campo idEmpleado debe ser tipo numérico' })
    readonly idEmpleado: number;
}
