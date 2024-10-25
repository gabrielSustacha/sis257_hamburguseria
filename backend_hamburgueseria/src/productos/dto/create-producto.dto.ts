import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(150, {
      message: 'El campo descripcion no debe ser mayor a 150 caracteres',
    })
    readonly descripcion: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precio es obligatorio' })
    @IsNumber({}, { message: 'El campo precio debe ser de tipo número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    readonly precio: number;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo stock es obligatorio' })
    @IsNumber({}, { message: 'El campo stock debe ser de tipo número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    readonly stock: number;
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descuento es obligatorio' })
    @IsNumber({}, { message: 'El campo descuento debe ser de tipo número' })
    @Min(0, { message: 'El descuento no puede ser negativo' })
    readonly descuento: number;
}
