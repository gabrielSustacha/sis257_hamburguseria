import type { Categoria } from "./categoria"


export interface Producto {
  id: number
  descripcion: string
  precio: number
  stock: number
  descuento: number
  categoria: Categoria


}
