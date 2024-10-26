import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detallePedido')
export class DetallePedido {
    @PrimaryGeneratedColumn('identity')
    id: number;
  
    @Column('int')
    cantidad: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    precioUnitario: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;
  
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_actualizacion' })
    fechaActualisacion: Date;
  
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaElimincaion: Date;
    @ManyToOne(() => Producto, (producto) => producto.detalleProductos)
    @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
    producto: Producto;
    @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos)
    @JoinColumn({ name: 'id_pedido', referencedColumnName: 'id' })
    pedido: Pedido;
}
