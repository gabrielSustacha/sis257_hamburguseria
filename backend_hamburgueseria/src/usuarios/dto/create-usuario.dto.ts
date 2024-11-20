import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombreUsuario es obligatorio' })
    @IsString({ message: 'El campo nombreUsuario debe ser de tipo cadena' })
    @MaxLength(50, {
      message: 'El campo nombreUsuario no debe ser mayor a 50 caracteres',
    })
    readonly usuario: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo contraseña es obligatorio' })
    @IsString({ message: 'El campo contraseña debe ser de tipo cadena' })
    @MaxLength(255, {
        message: 'El campo contraseña no debe ser mayor a 255 caracteres',
    })
    readonly clave: string;
    
  
    
 
}


