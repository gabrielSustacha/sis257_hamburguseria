import type { Producto } from "./producto"
import type { Venta } from "./venta"

export interface Ventadetalle {
  id: number;
  cantidad: string;
  subtotal: string;
  venta: Venta;
  producto: Producto;
}
