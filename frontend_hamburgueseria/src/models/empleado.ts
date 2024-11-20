import type { Usuario } from "./usuario";

export interface Empleado{
  id: number;
  nombres: string;
  apellidos: string;
  cargo: string;
  salario: number;
  fechaContratacion: Date;
  fechaCreacion: Date;
  usuario: Usuario
}
