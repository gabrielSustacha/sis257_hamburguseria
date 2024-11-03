import { Categoria } from "src/categorias/entities/categoria.entity";
import { DetallePedido } from "src/detalle-pedidos/entities/detalle-pedido.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar', { length: 150 })
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @Column('decimal', { precision: 10, scale: 2 })
    stock: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true, default: 0 })
    descuento: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
    @OneToMany(() => DetallePedido, (detallePedidos) => detallePedidos.producto)
    detalleProductos: DetallePedido[];

    @ManyToOne(() => Categoria, (categoria) => categoria.producto)
    @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
    categoria: Categoria;
}
