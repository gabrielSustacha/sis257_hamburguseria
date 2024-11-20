import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';


@Entity('ventas_detalle')
export class VentaDetalle {
    @PrimaryGeneratedColumn('identity')
    id: number;

    // @ManyToOne(() => Producto, producto => producto.ventas, { eager: true })
    // producto: Producto;

    @ManyToOne(() => Venta, venta => venta.detalles)
    venta: Venta;

    @Column('decimal', { precision: 10, scale: 2 })
    precioUnitario: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column()
    cantidad: number;
  subTotal: number;
}
