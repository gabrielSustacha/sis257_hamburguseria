import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreatePagoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo monto es obligatorio' })
    @IsNumber({}, { message: 'El campo monto debe ser de tipo número' })
    @Min(0, { message: 'El monto no puede ser negativo' })
    readonly monto: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo total es obligatorio' })
    @IsNumber({}, { message: 'El campo total debe ser de tipo número' })
    @Min(0, { message: 'El total no puede ser negativo' })
    readonly total: number;
    @ApiProperty()
    @IsDefined({ message: 'El campo idPedido debe estar definido' })
    @IsNumber({}, { message: 'El campo idPedido debe ser tipo numérico' })
    readonly idPedido: number;
}