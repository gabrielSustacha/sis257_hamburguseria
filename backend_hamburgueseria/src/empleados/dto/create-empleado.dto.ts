import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmpleadoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    readonly apellido: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El cargo es obligatorio' })
    @IsString({ message: 'El cargo debe ser una cadena de texto' })
    readonly cargo: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'El celular es obligatorio' })
    @IsString({ message: 'El celular debe ser una cadena de texto' })
    readonly celular: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo fechaContratacion debe estar definido' })
    @IsDateString(
      {},
      { message: 'El campo fechaContratacion debe ser de tipo fecha' },
    )
    readonly fechaContratacion: Date;

  // @ApiProperty()
  // @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  // @IsNumber({}, { message: 'El ID de usuario debe ser un número' })
  // readonly idUsuario: number;
}
