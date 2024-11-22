import type { Cliente } from './cliente'
import type { Empleado } from './empleado';
import type { Producto } from './producto';
import type { Ventadetalle } from './ventadetalle';

export interface Venta {
  id: number;
  fechaCreacion: Date;

  cantidad: number;

  precioUnitario: number;

  totalVenta: number;

  cliente: Cliente;

  producto: Producto;

  empleado: Empleado;
  ventadetalle:Ventadetalle[]

}
