import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar', { length: 100 })
    nombre: string;

    @Column('text', { nullable: true })
    descripcion: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
    @OneToMany(() => Producto, (producto) => producto.categoria)
    producto: Producto[];
}