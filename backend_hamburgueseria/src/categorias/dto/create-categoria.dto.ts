import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(100, {
        message: 'El campo nombre no debe ser mayor a 100 caracteres',
    })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(100, {
        message: 'El campo descripcion no debe ser mayor a 100 caracteres',
    })
    readonly descripcion: string; 
}