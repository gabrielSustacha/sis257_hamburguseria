import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { VentaDetalle } from 'src/ventas-detalles/entities/ventas-detalle.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';


@Entity()
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

   
    @Column()
    fechaVenta: Date;

    @Column()
    metodoPago: string;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

  
    


    @OneToMany(() => VentaDetalle, ventaDetalle => ventaDetalle.venta, { cascade: true })
    detalles: VentaDetalle[];

    @ManyToOne(() => Empleado, (empleado) => empleado.ventas)
    @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
    empleado: Empleado;


}
