import type { Categoria } from "./categoria";


export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precioUnitario:number
    stock: number;
    catagoria:Categoria;
    fechaCreacion:Date;
  }