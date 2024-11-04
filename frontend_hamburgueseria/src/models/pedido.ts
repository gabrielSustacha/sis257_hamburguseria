import type { Cliente } from "./cliente"
import type { Empleado } from "./empleado"

export interface Pedido {
  id: number
  metodoPago: string
  estado: string
  empleado: Empleado
  cliente: Cliente

}
