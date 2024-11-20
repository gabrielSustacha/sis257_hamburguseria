import type { Categoria } from "./categoria"


export interface Producto {
  id: number;

  nombre: string;

  descripcion: string;

  precioUnitario:number;

  stock: number;

  fechaCreacion: Date;

  fechaModificacion:Date

  categoria: Categoria


}
